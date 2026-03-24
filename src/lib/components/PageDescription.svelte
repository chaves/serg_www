<script lang="ts">
	import { formatDate } from '$lib/utils';
	import DownloadFiles from '$lib/components/DownloadFiles.svelte';
	import AreasTags from '$lib/components/AreasTags.svelte';
	import { CMS_BASE_URL } from '$lib/config';
	import type { Snippet } from 'svelte';
	let {
		title,
		description,
		areas = [],
		attachedFiles = [],
		publishedAt,
		picture,
		pictureUrl,
		calendar
	}: {
		title: string;
		description: string;
		areas?: any[];
		attachedFiles?: any[];
		publishedAt: string;
		picture?: {
			url?: string;
			width?: number;
			height?: number;
			formats?: {
				thumbnail?: { url: string; width: number; height: number };
				small?: { url: string; width: number; height: number };
				medium?: { url: string; width: number; height: number };
			};
		};
		pictureUrl?: string;
		calendar?: Snippet;
	} = $props();

	const imageSrc = $derived(
		picture
			? `${CMS_BASE_URL}${picture.formats?.medium?.url || picture.formats?.small?.url || picture.url || ''}`
			: `${CMS_BASE_URL}${pictureUrl || ''}`
	);
	const imageWidth = $derived(picture?.formats?.medium?.width || picture?.width || undefined);
	const imageHeight = $derived(picture?.formats?.medium?.height || picture?.height || undefined);
	const imageSrcset = $derived(
		[
			picture?.formats?.thumbnail,
			picture?.formats?.small,
			picture?.formats?.medium
		]
			.map((format) =>
				format?.url && format?.width ? `${CMS_BASE_URL}${format.url} ${format.width}w` : null
			)
			.filter((value): value is string => Boolean(value))
			.join(', ')
	);
</script>

<div class="picture">
	<img
		src={imageSrc}
		alt={title}
		loading="eager"
		decoding="async"
		fetchpriority="high"
		srcset={imageSrcset || undefined}
		sizes="(max-width: 768px) 100vw, 900px"
		width={imageWidth}
		height={imageHeight}
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
		<AreasTags {areas} center={true} />
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
		@apply max-h-80 w-auto mx-auto rounded-xl;
		@apply object-contain;
		@apply shadow-md;
		@apply transition-transform duration-200 ease-out;
		@apply hover:scale-[1.02] hover:shadow-lg;
	}
	.areas {
		@apply mt-3 text-center;
	}

	.date {
		@apply text-gray-500 text-right text-sm clear-both block italic;
		@apply pt-6 pb-2;
	}

	.description {
		@apply mt-6 mx-auto max-w-3xl;
		@apply leading-7 md:leading-8;
		@apply text-gray-700;
	}

	.description :global(p) {
		@apply mb-5;
		@apply leading-7 md:leading-8;
	}

	.description :global(h2),
	.description :global(h3),
	.description :global(h4) {
		@apply mt-6 mb-4;
		@apply font-bold text-serg_blue-800;
	}

	.attached-files {
		@apply mt-3 flex justify-center;
	}
</style>
