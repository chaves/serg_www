<!-- src/components/NewCard.svelte -->
<script lang="ts">
	import type { Event } from '$types/events';
	import { formatDate, formatDateEvent } from '$lib/utils';
	import AreasTags from '$lib/components/AreasTags.svelte';
	import FirstTwoSentences from '$lib/components/FirstTwoSentences.svelte';
	import { Calendar } from 'lucide-svelte';
	import Card from '$lib/components/Card.svelte';

	export let event: Event;

	const pictureUrl = event.picture?.formats?.small?.url || event.picture?.url;
</script>

<Card title={event.title} slug={event.slug} path="events">
	<svelte:fragment slot="header">
		<p class="text-gray-600 mb-1">
			<Calendar class="inline-block mr-1 -mt-1 w-4 h-4" />
			{formatDateEvent(event.date_start, event.date_end)}
		</p>
	</svelte:fragment>

	<svelte:fragment slot="description">
		<FirstTwoSentences text={event.description} slug={event.slug} path="events" />
	</svelte:fragment>

	<svelte:fragment slot="tags">
		{#if event.areas}
			<div class="areas">
				<AreasTags areas={event.areas} />
			</div>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<p class="date">Publication date: {formatDate(event.publishedAt)}</p>
	</svelte:fragment>

	<svelte:fragment slot="picture">
		{#if event.picture}
			<img src="https://cms.serg.paris{pictureUrl}" alt={event.title} />
		{/if}
	</svelte:fragment>
</Card>

<style>
	.areas {
		@apply mt-3;
	}

	.date {
		@apply text-gray-600 my-2 text-sm clear-both block italic;
	}

		img {
		@apply rounded-xl max-h-60 md:h-40 object-cover;
	}
</style>
