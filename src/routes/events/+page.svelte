<script lang="ts">
	import type { Event } from '$types/events';
	export let data: {
		events: Event[] | null;
		error?: string;
	};

</script>

<svelte:head>
	<title>Sustainable Economy Research Group (SERG) - Events</title>
</svelte:head>

<section class="container mx-auto">

	<h1 class="mb-4">Events</h1>

	{#if data.events}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.events as event (event.id)}
				<div class="event-card p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
					<p class="font-semibold mb-2">
						<a href="/events/{event.attributes.slug}">
							{event.attributes.title}
						</a>
					</p>
					<!-- Additional event details can be added here -->
				</div>
			{/each}
		</div>
	{:else if data.error}
		<p class="text-red-500 text-center">Error: {data.error}</p>
	{:else}
		<p class="text-center">Loading...</p>
	{/if}
</section>


<style>
	.container {
		max-width: 1200px;
	}
	.event-card {
		background-color: #fff;
	}
</style>
