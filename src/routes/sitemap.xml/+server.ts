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
	'/prizes'
];

async function getDynamicRoutes() {
	const routes: string[] = [];

	try {
		// Fetch events - explicitly request published content with cache-busting
		const eventsRes = await fetch(
			`${CMS_BASE_URL}/api/events?publicationState=live&fields[0]=slug`,
			NO_CACHE_FETCH_OPTIONS
		);
		if (eventsRes.ok) {
			const eventsData = await eventsRes.json();
			eventsData.data?.forEach((event: { slug: string }) => {
				routes.push(`/events/${event.slug}`);
			});
		}

		// Fetch news - explicitly request published content with cache-busting
		const newsRes = await fetch(
			`${CMS_BASE_URL}/api/news?publicationState=live&fields[0]=slug`,
			NO_CACHE_FETCH_OPTIONS
		);
		if (newsRes.ok) {
			const newsData = await newsRes.json();
			newsData.data?.forEach((article: { slug: string }) => {
				routes.push(`/news/${article.slug}`);
			});
		}

		// Fetch people - explicitly request published content with cache-busting
		const peopleRes = await fetch(
			`${CMS_BASE_URL}/api/people?publicationState=live&fields[0]=slug`,
			NO_CACHE_FETCH_OPTIONS
		);
		if (peopleRes.ok) {
			const peopleData = await peopleRes.json();
			peopleData.data?.forEach((person: { slug: string }) => {
				routes.push(`/people/${person.slug}`);
			});
		}

		// Fetch working papers - explicitly request published content with cache-busting
		const papersRes = await fetch(
			`${CMS_BASE_URL}/api/working-papers?publicationState=live&fields[0]=slug`,
			NO_CACHE_FETCH_OPTIONS
		);
		if (papersRes.ok) {
			const papersData = await papersRes.json();
			papersData.data?.forEach((paper: { slug: string }) => {
				routes.push(`/working-papers/${paper.slug}`);
			});
		}
	} catch (error) {
		console.error('Error fetching dynamic routes for sitemap:', error);
	}

	return routes;
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
