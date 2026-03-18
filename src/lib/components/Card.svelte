<script lang="ts">
	import AreasTags from '$lib/components/AreasTags.svelte';
	import FirstTwoSentences from '$lib/components/FirstTwoSentences.svelte';
	import { formatDate } from '$lib/utils';
	import { CMS_BASE_URL } from '$lib/config';
	import type { Snippet } from 'svelte';
	let {
		title,
		slug,
		path,
		areas = [],
		publishedAt = '',
		picture,
		pictureUrl = '',
		description = '',
		header
	}: {
		title: string;
		slug: string;
		path: string;
		areas?: any[];
		publishedAt?: string;
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
		description?: string;
		header?: Snippet;
	} = $props();

	const pictureSrc = $derived(
		picture
			? `${CMS_BASE_URL}${picture.formats?.small?.url || picture.formats?.thumbnail?.url || picture.url || ''}`
			: pictureUrl
				? `${CMS_BASE_URL}${pictureUrl}`
				: ''
	);
	const pictureWidth = $derived(picture?.formats?.small?.width || picture?.width || undefined);
	const pictureHeight = $derived(picture?.formats?.small?.height || picture?.height || undefined);
	const pictureSrcset = $derived(
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

<article>
	<div class="content">
		<div class="picture_mobile">
			{#if pictureSrc}
				<img
					src={pictureSrc}
					alt={title}
					loading="lazy"
					decoding="async"
					srcset={pictureSrcset || undefined}
					sizes="(max-width: 768px) 100vw, 320px"
					width={pictureWidth}
					height={pictureHeight}
				/>
			{/if}
		</div>

		{#if header}
			{@render header()}
		{/if}

		<h3 class="text-xl font-semibold mb-2">
			<a href="/{path}/{slug}">{title}</a>
		</h3>

		<div class="description">
			<FirstTwoSentences text={description} {slug} {path} />
		</div>

		{#if areas}
			<div class="areas">
				<AreasTags {areas} />
			</div>
		{/if}

		{#if publishedAt}
			<p class="date">Publication date: {formatDate(publishedAt)}</p>
		{/if}
	</div>
	<div class="picture">
		{#if pictureSrc}
			<img
				src={pictureSrc}
				alt={title}
				loading="lazy"
				decoding="async"
				srcset={pictureSrcset || undefined}
				sizes="320px"
				width={pictureWidth}
				height={pictureHeight}
			/>
		{/if}
	</div>
</article>

<style>
	article {
		@apply flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300;
		@apply border border-gray-200 hover:border-serg_blue-300;
		@apply hover:scale-[1.02];
		background: linear-gradient(to bottom right, white, rgba(0, 51, 102, 0.02));
	}

	.content {
		@apply text-lg flex-1;
	}

	.picture {
		@apply ml-4 hidden md:block;
	}

	.picture_mobile {
		@apply md:hidden mb-2;
	}

	.description {
		@apply text-base italic;
	}

	.areas {
		@apply mt-3;
	}

	.date {
		@apply text-gray-600 my-2 text-sm clear-both block italic;
	}

	img {
		@apply rounded-xl w-full h-40 md:w-fit object-cover;
		@apply shadow-md;
		@apply transition-all duration-300;
		@apply hover:shadow-lg hover:scale-105;
	}
</style>
