import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Set cache headers for optimal SEO and performance
	const url = event.url.pathname;

	// For HTML pages (dynamic content), use very short cache to ensure new published content is visible immediately
	// This ensures content updates are visible quickly while still being cacheable for SEO
	if (response.headers.get('content-type')?.includes('text/html')) {
		// Cache for only 60 seconds, with must-revalidate to ensure fresh content
		// This means: serve cached content for 60 seconds max, then must revalidate
		// This ensures new published content appears within 60 seconds
		response.headers.set(
			'Cache-Control',
			'public, max-age=60, s-maxage=60, must-revalidate, stale-while-revalidate=300'
		);

		// Add ETag based on content hash for proper cache validation
		// Using a timestamp ensures each request gets a unique ETag
		if (!response.headers.has('ETag')) {
			response.headers.set('ETag', `"${Date.now()}"`);
		}

		// Add Last-Modified header to help with cache validation
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

