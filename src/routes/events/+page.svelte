<script lang="ts">
	import type { PageData } from './$types';
	import EventCard from './EventCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title="Events"
	description="Upcoming and past events organized by the Sustainable Economy Research Group (SERG) at CentraleSupélec."
/>

<h1 class="mb-4">Events</h1>

{#if data.events}
	<div class="space-y-6">
		{#each data.events as event (event.id)}
			<EventCard {event} />
		{/each}
	</div>
{:else}
	<p class="text-center">No events available.</p>
{/if}
