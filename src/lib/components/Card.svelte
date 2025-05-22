<script lang="ts">
	import AreasTags from '$lib/components/AreasTags.svelte';
	import FirstTwoSentences from '$lib/components/FirstTwoSentences.svelte';
	import { formatDate } from '$lib/utils';
	export let title: string;
	export let slug: string;
	export let path: string;
	export let areas: any[];
	export let publishedAt: string;
	export let pictureUrl: string;
	export let description: string;
</script>

<article>
	<div class="content">
		<div class="picture_mobile">
			{#if pictureUrl}
				<img src="https://cms.serg.paris{pictureUrl}" alt={title} />
			{/if}
		</div>

		<slot name="header" />

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
		{#if pictureUrl}
			<img src="https://cms.serg.paris{pictureUrl}" alt={title} />
		{/if}
	</div>
</article>

<style>
	article {
		@apply flex items-center justify-between bg-white p-4 rounded shadow hover:shadow-md transition-shadow;
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
		@apply text-sm italic;
	}

	.areas {
		@apply mt-3;
	}

	.date {
		@apply text-gray-600 my-2 text-sm clear-both block italic;
	}

	img {
		@apply rounded-xl w-full h-40 md:w-fit object-cover;
	}
</style>
