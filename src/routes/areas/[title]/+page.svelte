<script lang="ts">
	import type { Event } from '../../../types/events';

	export let data: {
		event: Event | null;
		error?: string;
	};
</script>

<svelte:head>
	<title>Sustainable Economy Research Group (SERG) - Events</title>
</svelte:head>

{#if data.event}
	<h1 class="text-left">
		{data.event.attributes.title}
	</h1>
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}
