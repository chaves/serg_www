<script lang="ts">
	import type { Event } from '$types/events';
	import EventCard from './EventCard.svelte';

	export let data: {
		events: Event[] | null;
		error?: string;
	};
</script>

<svelte:head>
	<title>Sustainable Economy Research Group (SERG) - Events</title>
</svelte:head>

<h1 class="mb-4">Events</h1>

{#if data.events}
	<div class="space-y-6">
		{#each data.events as event (event.id)}
			<EventCard {event} />
		{/each}
	</div>
{:else if data.error}
	<p class="text-red-500 text-center">Error: {data.error}</p>
{:else}
	<p class="text-center">Loading...</p>
{/if}
