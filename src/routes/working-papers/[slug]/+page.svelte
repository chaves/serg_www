<script lang="ts">
	import type { PageData } from './$types';
	import PaperPage from './PaperPage.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';
	import { stripHtml } from '$lib/utils';

	let { data }: { data: PageData } = $props();

	const title = $derived(data.paper?.title || 'Working paper');
	const description = $derived(
		data.paper?.abstract
			? stripHtml(data.paper.abstract)
			: 'Research working paper from the Sustainable Economy Research Group (SERG).'
	);
	const publishedTime = $derived(data.paper?.year ? `${data.paper.year}-01-01` : undefined);
</script>

<SEO title={title} description={description} type="article" publishedTime={publishedTime} />

<StructuredData
	type="Article"
	data={{
		title,
		description,
		publishedAt: publishedTime,
		author: 'SERG'
	}}
/>

{#if data.paper}
	<h1>{title}</h1>
	<PaperPage paper={data.paper} />
{:else}
	<p>Working paper unavailable.</p>
{/if}
