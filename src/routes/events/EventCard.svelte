<!-- src/components/NewCard.svelte -->
<script lang="ts">
	import type { Event } from '$types/events';
	import { formatDate, formatDateEvent } from '$lib/utils';

	import AreasTags from '$lib/components/AreasTags.svelte';
	import FirstTwoSentences from '$lib/components/FirstTwoSentences.svelte';
	import { Calendar } from 'lucide-svelte';

	export let event: Event;

	const pictureUrl = event.picture?.formats?.small?.url || event.picture?.url;
</script>

<article>
	<div class="content">
		<div class="picture_mobile">
			<img class="w-full" src="https://cms.serg.paris{pictureUrl}" alt={event.title} />
		</div>

		<p class="text-gray-600 mb-1">
			<Calendar class="inline-block mr-1 -mt-1 w-4 h-4" />
			{formatDateEvent(event.date_start, event.date_end)}
		</p>
		<h3 class="text-xl font-semibold mb-2">
			<a href="/events/{event.slug}">{event.title}</a>
		</h3>

		<div class="description">
			<FirstTwoSentences text={event.description} slug={event.slug} path="events" />
		</div>

		{#if event.areas}
			<div class="areas">
				<AreasTags areas={event.areas} />
			</div>
		{/if}
		<p class="date">Publication date: {formatDate(event.publishedAt)}</p>
	</div>
	{#if event.picture}
		<div class="picture">
			<img src="https://cms.serg.paris{pictureUrl}" alt={event.title} />
		</div>
	{/if}
</article>

<style>
	article {
		@apply flex items-center justify-between bg-white p-4 rounded shadow hover:shadow-md transition-shadow;
	}

	.content {
		@apply text-lg flex-1;
	}
	.picture {
		@apply ml-4
		 hidden md:block;
	}

	.picture_mobile {
		@apply md:hidden mb-2;
	}

	img {
		@apply rounded-xl max-h-60 md:h-40 object-cover;
	}

	.description {
		@apply text-sm italic;
	}

	.areas {
		@apply mt-3;
	}

	.date {
		@apply text-gray-600 my-2 text-sm clear-both block italic;
	}
</style>
