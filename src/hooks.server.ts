import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Set cache headers for optimal SEO and performance
	const url = event.url.pathname;

	// For HTML pages (dynamic content), use short cache with revalidation
	// This ensures content updates while still being cacheable for SEO
	if (response.headers.get('content-type')?.includes('text/html')) {
		// Cache for 1 hour, but allow stale-while-revalidate for better performance
		// This means: serve cached content for 1 hour, but revalidate in background
		response.headers.set(
			'Cache-Control',
			'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
		);

		// Add ETag support for better caching
		if (!response.headers.has('ETag')) {
			response.headers.set('ETag', `"${Date.now()}"`);
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

