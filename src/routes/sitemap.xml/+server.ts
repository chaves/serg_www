import type { RequestHandler } from './$types';

const siteUrl = 'https://serg.paris';

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
		// Fetch events
		const eventsRes = await fetch('https://cms.serg.paris/api/events?fields[0]=slug');
		if (eventsRes.ok) {
			const eventsData = await eventsRes.json();
			eventsData.data?.forEach((event: { slug: string }) => {
				routes.push(`/events/${event.slug}`);
			});
		}

		// Fetch news
		const newsRes = await fetch('https://cms.serg.paris/api/news?fields[0]=slug');
		if (newsRes.ok) {
			const newsData = await newsRes.json();
			newsData.data?.forEach((article: { slug: string }) => {
				routes.push(`/news/${article.slug}`);
			});
		}

		// Fetch people
		const peopleRes = await fetch('https://cms.serg.paris/api/people?fields[0]=slug');
		if (peopleRes.ok) {
			const peopleData = await peopleRes.json();
			peopleData.data?.forEach((person: { slug: string }) => {
				routes.push(`/people/${person.slug}`);
			});
		}

		// Fetch working papers
		const papersRes = await fetch('https://cms.serg.paris/api/working-papers?fields[0]=slug');
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
