<script lang="ts">
	import type { Event } from '$types/events';

	import AreasTags from '$lib/components/AreasTags.svelte';
    import DownloadFiles from '$lib/components/DownloadFiles.svelte';

	export let data: {
		event: Event | null;
		error?: string;
	};
	const title = data.event ? data.event.title : 'Event not found';
</script>

<svelte:head>
	<title>SERG - {title}</title>
</svelte:head>

{#if data.event}
	<h1 class="text-left">
		{data.event.title}
	</h1>
	<div class="description">
		{@html data.event.description}
	</div>
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}
