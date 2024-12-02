<!-- src/components/NewCard.svelte -->
<script lang="ts">
    import type { Event } from '$types/events';
    import { formatDate } from '$lib/utils';

    import AreasTags from '$lib/components/AreasTags.svelte';
    import FirstTwoSentences from '$lib/components/FirstTwoSentences.svelte';

    export let event: Event;
  </script>

<article>
	{#if event.picture}
		<img src="https://cms.serg.paris{event.picture.url}" alt={event.title} />
	{/if}
	<div class="content">
		<h3 class="text-xl font-semibold mb-2">
			<a href="/events/{event.slug}">{event.title}</a>
		</h3>

		<div class="description">
			<FirstTwoSentences text={event.description} slug={event.slug} />
		</div>

    {#if event.areas}
		<div class="areas">
			<AreasTags areas={event.areas} />
		</div>
    {/if}
		<p class="date">Publication date: {formatDate(event.publishedAt)}</p>
	</div>
</article>

<style>
	img {
		@apply rounded-sm mx-auto mb-4 object-cover float-right ml-9 p-6 max-h-28 md:max-h-36;
	}
	.content {
		@apply bg-white p-6 rounded shadow hover:shadow-md transition-shadow;
	}

	.description {
		@apply text-sm italic;
	}

  .areas {
		@apply mt-3;
	}

  .date {
		@apply text-gray-600 my-2 text-right text-xs clear-both block italic;
	}
</style>


