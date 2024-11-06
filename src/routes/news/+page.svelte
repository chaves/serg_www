<script lang="ts">
	import type { NewsResponse } from '$lib/types/news';
  import { formatDate } from '$lib/utils';

	export let data: {
		news: NewsResponse | null;
		error?: string;
	};

</script>

  <svelte:head>
    <title>Sustainable Economy Research Group (SERG) - News</title>
  </svelte:head>

  <h1>Latest News and Updates</h1>

  <div class="space-y-6">
    {#each data.news.data as article}
      <article class="bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-2">
          <a herf="/news/{article.attributes.slug}">{article.attributes.title}</a>
        </h3>
        <p class="text-sm text-gray-600 mb-2">{formatDate(article.attributes.publishedAt)}</p>
        <p class="text-base leading-relaxed mb-4">{@html article.attributes.description}</p>
        <a href={`/news/${article.attributes.slug}`} class="text-green-700 hover:underline">Read more</a>
      </article>
    {/each}
  </div>