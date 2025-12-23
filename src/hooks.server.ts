import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Set cache headers for optimal SEO and performance
	const url = event.url.pathname;

	// For HTML pages (prerendered static content), use longer cache for better performance
	// Since we use webhooks to rebuild on content changes, static pages can be cached longer
	if (response.headers.get('content-type')?.includes('text/html')) {
		// Check if this is a prerendered page (has x-sveltekit-prerender header or is in static routes)
		const isPrerendered = response.headers.has('x-sveltekit-prerender') ||
			!url.includes('/api/') && !url.includes('/publications'); // publications stays dynamic

		if (isPrerendered) {
			// Prerendered pages: cache for 1 hour, revalidate in background
			// Webhooks trigger rebuilds, so content stays fresh
			response.headers.set(
				'Cache-Control',
				'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
			);
		} else {
			// Dynamic pages (like /publications): shorter cache
			response.headers.set(
				'Cache-Control',
				'public, max-age=300, s-maxage=300, stale-while-revalidate=3600'
			);
		}

		// Add Last-Modified header for cache validation
		if (!response.headers.has('Last-Modified')) {
			response.headers.set('Last-Modified', new Date().toUTCString());
		}
	}

	// For static assets (CSS, JS, images), use longer cache
	if (
		url.includes('/_app/') ||
		url.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot)$/i)
	) {
		response.headers.set(
			'Cache-Control',
			'public, max-age=31536000, immutable'
		);
	}

	// For API routes and dynamic data, use shorter cache
	if (url.startsWith('/api/') || url.includes('+page.server')) {
		response.headers.set(
			'Cache-Control',
			'public, max-age=300, s-maxage=300, stale-while-revalidate=3600'
		);
	}

	return response;
};

