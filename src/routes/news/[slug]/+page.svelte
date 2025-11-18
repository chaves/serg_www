<script lang="ts">
	import type { PageData } from './$types';
	import NewPage from './NewDescription.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';

	let { data }: { data: PageData } = $props();
	const title = data.new ? data.new.title : 'New not found';
	const description = data.new?.description;
	const image = data.new?.picture?.formats?.medium?.url || data.new?.picture?.url;
	const imageUrl = image ? `https://cms.serg.paris${image}` : undefined;
</script>

{#if data.new}
	<SEO
		title={title}
		description={description}
		image={imageUrl}
		type="article"
		publishedTime={data.new.publishedAt}
	/>
	<StructuredData
		type="Article"
		data={{
			title: data.new.title,
			description: data.new.description,
			image: image,
			publishedAt: data.new.publishedAt
		}}
	/>
{/if}

{#if data.new}
	<NewPage article={data.new} />
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}
