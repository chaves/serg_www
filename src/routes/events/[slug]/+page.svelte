<script lang="ts">
	import type { PageData } from './$types';
	import EventDescription from './EventDescription.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';
	import { CMS_BASE_URL } from '$lib/config';

	let { data }: { data: PageData } = $props();
	const title = data.event ? data.event.title : 'Event not found';
	const description = data.event?.description;
	const image = data.event?.picture?.formats?.medium?.url || data.event?.picture?.url;
	const imageUrl = image ? `${CMS_BASE_URL}${image}` : undefined;
</script>

{#if data.event}
	<SEO
		title={title}
		description={description}
		image={imageUrl}
		type="article"
		publishedTime={data.event.publishedAt}
	/>
	<StructuredData
		type="Event"
		data={{
			title: data.event.title,
			description: data.event.description,
			image: image,
			date_start: data.event.date_start,
			date_end: data.event.date_end
		}}
	/>
{/if}

{#if data.event}
	<EventDescription event={data.event} />
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}
