<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { stripHtml, truncateText } from '$lib/utils';

	let {
		title,
		description,
		image,
		type = 'website',
		publishedTime,
		modifiedTime,
		authors,
		noindex = false,
		nofollow = false
	}: {
		title: string;
		description?: string;
		image?: string;
		type?: 'website' | 'article' | 'profile';
		publishedTime?: string;
		modifiedTime?: string;
		authors?: Array<{ name: string; url?: string }>;
		noindex?: boolean;
		nofollow?: boolean;
	} = $props();

	const siteUrl = browser ? window.location.origin : 'https://serg.paris';
	const currentUrl = browser ? window.location.href : `${siteUrl}${$page.url.pathname}`;
	const fullTitle = title.includes('SERG') ? title : `${title} | SERG`;
	const defaultImage = `${siteUrl}/logo_100.png`;
	const ogImage = image || defaultImage;
	const defaultDescription =
		'Sustainable Economy Research Group (SERG) at CentraleSupélec / Paris-Saclay University / Industrial Engineering Department (LGI)';
	const cleanDescription = description ? stripHtml(description) : defaultDescription;
	const metaDescription = truncateText(cleanDescription, 160);

	const robotsContent = [noindex ? 'noindex' : 'index', nofollow ? 'nofollow' : 'follow'].join(
		', '
	);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={metaDescription} />
	<meta name="robots" content={robotsContent} />
	<link rel="canonical" href={currentUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content="SERG - Sustainable Economy Research Group" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={currentUrl} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:image" content={ogImage} />

	{#if type === 'article'}
		{#if publishedTime}
			<meta property="article:published_time" content={publishedTime} />
		{/if}
		{#if modifiedTime}
			<meta property="article:modified_time" content={modifiedTime} />
		{/if}
		{#if authors}
			{#each authors as author}
				<meta property="article:author" content={author.name} />
			{/each}
		{/if}
	{/if}
</svelte:head>
