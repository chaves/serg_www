<script lang="ts">
	import { formatDate } from '$lib/utils';
	import DownloadFiles from '$lib/components/DownloadFiles.svelte';
	import AreasTags from '$lib/components/AreasTags.svelte';
	import type { Snippet } from 'svelte';
	let {
		title,
		description,
		areas = [],
		attachedFiles = [],
		publishedAt,
		pictureUrl,
		calendar
	}: {
		title: string;
		description: string;
		areas?: any[];
		attachedFiles?: any[];
		publishedAt: string;
		pictureUrl: string;
		calendar?: Snippet;
	} = $props();
</script>

<div class="picture">
	<img
		src="https://cms.serg.paris{pictureUrl}"
		alt={title}
		loading="lazy"
		decoding="async"
		fetchpriority="high"
	/>
</div>

<h1 class="text-2xl font-semibold mb-2">
	{title}
</h1>

{#if calendar}
	{@render calendar()}
{/if}

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
		@apply object-cover;
		@apply shadow-lg;
		@apply transition-transform duration-300;
		@apply hover:scale-105;
	}
	.areas {
		@apply mt-3 text-center;
	}

	.date {
		@apply text-gray-600 my-2 text-right text-sm clear-both block italic;
	}

	.description {
		@apply mt-6;
		@apply leading-7 md:leading-8;
		@apply text-gray-800;
	}

	.description :global(p) {
		@apply mb-5;
		@apply leading-7 md:leading-8;
	}

	.description :global(h2),
	.description :global(h3),
	.description :global(h4) {
		@apply mt-6 mb-4;
		@apply font-bold text-serg_blue-600;
	}

	.attached-files {
		@apply mt-3;
	}
</style>
