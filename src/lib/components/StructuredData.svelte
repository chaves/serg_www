<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { CMS_BASE_URL, SITE_URL } from '$lib/config';

	let {
		type = 'WebPage',
		data
	}: {
		type?: 'WebPage' | 'Article' | 'Event' | 'Person' | 'Organization';
		data?: Record<string, any>;
	} = $props();

	const siteUrl = browser ? window.location.origin : SITE_URL;
	const currentUrl = browser ? window.location.href : `${siteUrl}${$page.url.pathname}`;

	function getStructuredData() {
		const base = {
			'@context': 'https://schema.org',
			'@type': type,
			url: currentUrl
		};

		switch (type) {
			case 'Organization':
				return {
					...base,
					name: 'Sustainable Economy Research Group (SERG)',
					alternateName: 'SERG',
					url: siteUrl,
					logo: `${siteUrl}/logo_100.png`,
					address: {
						'@type': 'PostalAddress',
						addressCountry: 'FR',
						addressLocality: 'Gif-sur-Yvette',
						addressRegion: 'Île-de-France'
					},
					parentOrganization: {
						'@type': 'Organization',
						name: 'CentraleSupélec',
						url: 'https://www.centralesupelec.fr/'
					},
					department: {
						'@type': 'Organization',
						name: 'Industrial Engineering Department (LGI)'
					},
					...data
				};

			case 'Article':
				return {
					...base,
					headline: data?.title || '',
					description: data?.description || '',
					image: data?.image ? `${CMS_BASE_URL}${data.image}` : `${siteUrl}/logo_100.png`,
					datePublished: data?.publishedAt || '',
					dateModified: data?.modifiedAt || data?.publishedAt || '',
					author: data?.author
						? {
								'@type': 'Person',
								name: data.author
							}
						: {
								'@type': 'Organization',
								name: 'SERG'
							},
					publisher: {
						'@type': 'Organization',
						name: 'SERG',
						logo: {
							'@type': 'ImageObject',
							url: `${siteUrl}/logo_100.png`
						}
					},
					...data
				};

			case 'Event':
				return {
					...base,
					name: data?.title || '',
					description: data?.description || '',
					image: data?.image ? `${CMS_BASE_URL}${data.image}` : `${siteUrl}/logo_100.png`,
					startDate: data?.date_start || '',
					endDate: data?.date_end || data?.date_start || '',
					location: {
						'@type': 'Place',
						name: data?.location || 'CentraleSupélec',
						address: {
							'@type': 'PostalAddress',
							addressCountry: 'FR',
							addressLocality: 'Gif-sur-Yvette'
						}
					},
					organizer: {
						'@type': 'Organization',
						name: 'SERG'
					},
					...data
				};

			case 'Person':
				return {
					...base,
					name: data?.name || '',
					jobTitle: data?.category || '',
					worksFor: {
						'@type': 'Organization',
						name: 'SERG'
					},
					image: data?.image ? `${CMS_BASE_URL}${data.image}` : undefined,
					email: data?.email || undefined,
					...data
				};

			default:
				return {
					...base,
					name: data?.title || 'SERG',
					description: data?.description || '',
					...data
				};
		}
	}

	const structuredData = getStructuredData();
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>`}
</svelte:head>
