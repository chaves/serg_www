<script lang="ts">
	import type { Event } from '$types/events';
	import { formatDate, formatDateEvent } from '$lib/utils';

	import AreasTags from '$lib/components/AreasTags.svelte';
	import DownloadFiles from '$lib/components/DownloadFiles.svelte';
	import { Calendar } from 'lucide-svelte';

	export let event: Event;
</script>

{#if event.picture}
	<div class="picture">
		<img src="https://cms.serg.paris{event.picture.url}" alt={event.title} />
	</div>
{/if}

<h1 class="text-2xl font-semibold mb-2">
	{event.title}
</h1>

<p class="mb-1 text-center font-bold text-xl">
	<Calendar class="inline-block mr-1 -mt-1 w-6 h-6" />
	{formatDateEvent(event.date_start, event.date_end)}
</p>

{#if event.areas}
	<div class="areas">
		<AreasTags areas={event.areas} />
	</div>
{/if}

<div class="description">
	{@html event.description}
</div>

{#if event.attached_files}
	<div class="attached-files">
		<DownloadFiles files={event.attached_files} />
	</div>
{/if}

<br />

<p class="date">Publication date: {formatDate(event.publishedAt)}</p>

<style>
	.picture {
		@apply mb-4 object-cover ml-9 p-6;
	}

	img {
		@apply rounded-xl max-h-60 md:max-h-80 mx-auto;
	}

	.description {
		@apply text-sm italic;
	}

	.areas {
		@apply mt-3 text-center;
	}

	.date {
		@apply text-gray-600 my-2 text-right text-sm clear-both block italic;
	}

	.description {
		@apply mt-6;
	}

	.attached-files {
		@apply mt-3;
	}
</style>
