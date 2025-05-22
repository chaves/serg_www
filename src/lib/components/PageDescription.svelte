<script lang="ts">
	import { formatDate } from '$lib/utils';
	import DownloadFiles from '$lib/components/DownloadFiles.svelte';
	import AreasTags from '$lib/components/AreasTags.svelte';
	export let title: string;
	export let description: string;
	export let areas: any[];
	export let attachedFiles: any[];
	export let publishedAt: string;
	export let pictureUrl: string;
</script>

<div class="picture">
	<img src="https://cms.serg.paris{pictureUrl}" alt={title} />
</div>

<h1 class="text-2xl font-semibold mb-2">
	{title}
</h1>

<slot name="calendar" />

{#if areas}
	<div class="areas">
		<AreasTags {areas} />
	</div>
{/if}

<div class="description">
	{@html description}
</div>

{#if attachedFiles}
	<div class="attached-files">
		<DownloadFiles files={attachedFiles} />
	</div>
{/if}

<p class="date">Publication date: {formatDate(publishedAt)}</p>

<style>
	.picture {
		@apply mb-6;
	}

	img {
		@apply h-56 md:max-h-80 mx-auto rounded-xl;
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
