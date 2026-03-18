import type { RequestHandler } from './$types';
import { CMS_BASE_URL, SITE_URL } from '$lib/config';
import { NO_CACHE_FETCH_OPTIONS } from '$lib/utils';

const siteUrl = SITE_URL;

const staticRoutes = [
	'',
	'/news',
	'/events',
	'/people',
	'/publications',
	'/working-papers',
	'/prizes',
	'/cemsi'
];

async function fetchSlugs(endpoint: string, prefix: string): Promise<string[]> {
	const response = await fetch(endpoint, NO_CACHE_FETCH_OPTIONS);

	if (!response.ok) {
		throw new Error(`Failed to fetch sitemap slugs from ${endpoint}: ${response.status}`);
	}

	const data = await response.json();
	return data.data?.map((entry: { slug: string }) => `${prefix}/${entry.slug}`) || [];
}

async function getDynamicRoutes() {
	const [eventRoutes, newsRoutes, peopleRoutes, paperRoutes] = await Promise.all([
		fetchSlugs(`${CMS_BASE_URL}/api/events?publicationState=live&fields[0]=slug`, '/events'),
		fetchSlugs(`${CMS_BASE_URL}/api/news?publicationState=live&fields[0]=slug`, '/news'),
		fetchSlugs(`${CMS_BASE_URL}/api/people?publicationState=live&fields[0]=slug`, '/people'),
		fetchSlugs(
			`${CMS_BASE_URL}/api/working-papers?publicationState=live&fields[0]=slug`,
			'/working-papers'
		)
	]);

	return [...eventRoutes, ...newsRoutes, ...peopleRoutes, ...paperRoutes];
}

export const GET: RequestHandler = async () => {
	const dynamicRoutes = await getDynamicRoutes();
	const allRoutes = [...staticRoutes, ...dynamicRoutes];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		(route) => `	<url>
		<loc>${siteUrl}${route}</loc>
		<changefreq>weekly</changefreq>
		<priority>${route === '' ? '1.0' : '0.8'}</priority>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
