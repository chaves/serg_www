<script lang="ts">
	import type { Event } from '$types/events';
	import EventDescription from './EventDescription.svelte';

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
	<EventDescription event={data.event} />
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}
