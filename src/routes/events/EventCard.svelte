<!-- src/components/NewCard.svelte -->
<script lang="ts">
	import type { Event } from '$types/events';

	import { formatDateEvent } from '$lib/utils';
	import { Calendar } from 'lucide-svelte';
	import Card from '$lib/components/Card.svelte';

	export let event: Event;

	const pictureUrl = event.picture?.formats?.small?.url || event.picture?.url;
</script>

<Card
	title={event.title}
	slug={event.slug}
	path="events"
	areas={event.areas}
	{pictureUrl}
	description={event.description}
>
	<svelte:fragment slot="header">
		<p class="text-gray-600 mb-1">
			<Calendar class="inline-block mr-1 -mt-1 w-4 h-4" />
			{formatDateEvent(event.date_start, event.date_end)}
		</p>
	</svelte:fragment>
</Card>

<style>
</style>
