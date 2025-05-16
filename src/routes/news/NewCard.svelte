<!-- src/components/NewCard.svelte -->
<script lang="ts">
	import type { New } from '$types/news';
	import { formatDate } from '$lib/utils';

	import AreasTags from '$lib/components/AreasTags.svelte';
	import FirstTwoSentences from '$lib/components/FirstTwoSentences.svelte';

	export let article: New;

	const pictureUrl = article.picture?.formats?.thumbnail?.url || article.picture?.url;
</script>

<article>
	<div class="content">
		<h3 class="text-xl font-semibold mb-2">
			<a href="/news/{article.slug}">{article.title}</a>
		</h3>

		<div class="description">
			<FirstTwoSentences text={article.description} slug={article.slug} path="news" />
		</div>

		<div class="date">Publication date: {formatDate(article.publishedAt)}</div>

		{#if article.areas}
			<div class="areas">
				<AreasTags areas={article.areas} />
			</div>
		{/if}
	</div>

	<div class="picture">
		{#if article.picture}
			<img src="https://cms.serg.paris{pictureUrl}" alt={article.title} />
		{/if}
	</div>
</article>

<style>
	img {
		@apply rounded-xl object-cover max-h-48 md:max-h-60;
	}
	.content {
	}

	.picture {
		@apply mr-4 ml-12;
	}

	article {
		@apply flex items-center justify-between mb-2 bg-white p-4 rounded shadow hover:shadow-md transition-shadow;
	}

	.description {
		@apply text-sm italic;
	}

	.areas {
		@apply mt-3;
	}

	.date {
		@apply text-gray-600 my-2 float-right text-xs clear-both block italic;
	}
</style>
