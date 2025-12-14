<script lang="ts">
	import type { PageData } from './$types';
	import NewPage from './NewDescription.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';
	import { CMS_BASE_URL } from '$lib/config';

	let { data }: { data: PageData } = $props();
	const title = $derived(data.new ? data.new.title : 'New not found');
	const description = $derived(data.new?.description);
	const image = $derived(data.new?.picture?.formats?.medium?.url || data.new?.picture?.url);
	const imageUrl = $derived(image ? `${CMS_BASE_URL}${image}` : undefined);
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
