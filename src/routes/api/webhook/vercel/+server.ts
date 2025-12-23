import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

/**
 * Webhook endpoint to trigger Vercel deployments
 * Called by Strapi when content is published/updated
 *
 * Security: Requires WEBHOOK_SECRET to prevent unauthorized deployments
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		// Verify webhook secret for security
		const webhookSecret = env.WEBHOOK_SECRET;
		const providedSecret = request.headers.get('x-webhook-secret');

		if (!webhookSecret || providedSecret !== webhookSecret) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		// Get Vercel deployment token and project ID from environment
		const vercelToken = env.VERCEL_TOKEN;
		const vercelProjectId = env.VERCEL_PROJECT_ID;
		const vercelTeamId = env.VERCEL_TEAM_ID; // Optional, only if using Vercel teams

		if (!vercelToken || !vercelProjectId) {
			console.error('Missing Vercel configuration');
			return json({ error: 'Server configuration error' }, { status: 500 });
		}

		// Parse webhook payload from Strapi
		const payload = await request.json();
		const event = payload.event || payload.type; // Strapi webhook format

		console.log(`Webhook received: ${event}`, {
			model: payload.model,
			entry: payload.entry?.id || payload.entry?.slug
		});

		// Trigger Vercel deployment via Git
		// This is simpler and more reliable than using the deployments API directly
		// The webhook will trigger a redeploy by making a request to Vercel's deployment hook
		// Alternative: Use Vercel's Deploy Hooks feature (recommended - see documentation)

		// Option 1: Use Vercel Deploy Hook (recommended - set VERCEL_DEPLOY_HOOK_URL env var)
		const deployHookUrl = env.VERCEL_DEPLOY_HOOK_URL;

		if (deployHookUrl) {
			// Simple deploy hook - just POST to the URL
			const deploymentResponse = await fetch(deployHookUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					ref: 'main', // or your default branch
					...payload // Forward Strapi payload for logging
				})
			});

			if (!deploymentResponse.ok) {
				const errorText = await deploymentResponse.text();
				console.error('Vercel deploy hook failed:', errorText);
				return json(
					{ error: 'Failed to trigger deployment', details: errorText },
					{ status: deploymentResponse.status }
				);
			}

			return json({
				success: true,
				message: 'Deployment triggered successfully via deploy hook',
				event: event
			});
		}

		// Option 2: Use Vercel API (fallback if deploy hook not configured)
		const vercelUrl = vercelTeamId
			? `https://api.vercel.com/v1/deployments?teamId=${vercelTeamId}`
			: 'https://api.vercel.com/v1/deployments';

		const deploymentResponse = await fetch(vercelUrl, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${vercelToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: vercelProjectId,
				gitSource: {
					type: 'github', // or 'gitlab', 'bitbucket' depending on your setup
					ref: 'main' // or your default branch
				}
			})
		});

		if (!deploymentResponse.ok) {
			const errorText = await deploymentResponse.text();
			console.error('Vercel deployment failed:', errorText);
			return json(
				{ error: 'Failed to trigger deployment', details: errorText },
				{ status: deploymentResponse.status }
			);
		}

		const deployment = await deploymentResponse.json();

		return json({
			success: true,
			message: 'Deployment triggered successfully',
			deployment: {
				id: deployment.id,
				url: deployment.url,
				status: deployment.readyState
			}
		});
	} catch (error) {
		console.error('Webhook error:', error);
		return json(
			{ error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
			{ status: 500 }
		);
	}
};

