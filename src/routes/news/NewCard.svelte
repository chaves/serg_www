<!-- src/components/NewCard.svelte -->
<script lang="ts">
	import type { New } from '$types/news';
	import { formatDate } from '$lib/utils';

	import AreasTags from '$lib/components/AreasTags.svelte';

	export let article: New;
</script>

<article>
	{#if article.picture}
		<img src="https://cms.serg.paris{article.picture.url}" alt={article.title} />
	{/if}
  <div class="content">
	<h3 class="text-xl font-semibold mb-2">
		<a href="/news/{article.slug}">{article.title}</a>
	</h3>
  <AreasTags areas={article.areas} />
	<p class="text-sm text-gray-600 my-2">{formatDate(article.publishedAt)}</p>
	<a href={`/news/${article.slug}`}>Read more</a>
</div>
</article>

<style>
	img {
		@apply rounded-sm mx-auto mb-4 object-cover float-right ml-9 p-6 max-h-28 md:max-h-36;
	}
  .content {
    @apply bg-white p-6 rounded shadow hover:shadow-md transition-shadow;
  }
</style>
