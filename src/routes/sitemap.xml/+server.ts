import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/config';
import { fetchAllSlugs } from '$lib/cms';

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

async function getDynamicRoutes() {
	const sections = [
		['events', '/events'],
		['news', '/news'],
		['people', '/people'],
		['working-papers', '/working-papers']
	] as const;
	const routes = await Promise.all(
		sections.map(async ([collection, prefix]) =>
			(await fetchAllSlugs(collection)).map((slug) => `${prefix}/${slug}`)
		)
	);
	return routes.flat();
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
