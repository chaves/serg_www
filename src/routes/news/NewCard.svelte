<!-- src/components/NewCard.svelte -->
<script lang="ts">
	import type { New } from '$types/news';
	import { formatDate } from '$lib/utils';

	import AreasTags from '$lib/components/AreasTags.svelte';
	import FirstTwoSentences from '$lib/components/FirstTwoSentences.svelte';

	import Card from '$lib/components/Card.svelte';

	export let article: New;

	const pictureUrl = article.picture?.formats?.thumbnail?.url || article.picture?.url;
</script>

<Card title={article.title} slug={article.slug} path="news">
	<svelte:fragment slot="header"></svelte:fragment>

	<svelte:fragment slot="description">
		<FirstTwoSentences text={article.description} slug={article.slug} path="news" />
	</svelte:fragment>

	<svelte:fragment slot="tags">
		{#if article.areas}
			<div class="areas">
				<AreasTags areas={article.areas} />
			</div>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<p class="date">Publication date: {formatDate(article.publishedAt)}</p>
	</svelte:fragment>

	<svelte:fragment slot="picture">
		{#if article.picture}
			<img src="https://cms.serg.paris{pictureUrl}" alt={article.title} />
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
