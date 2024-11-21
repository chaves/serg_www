<!-- src/components/NewCard.svelte -->
<script lang="ts">
    import type { New } from '$types/news';
    import { formatDate } from '$lib/utils';

    import AreasTags from '$lib/components/AreasTags.svelte';

    export let article: New;
  </script>

  <article class="bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
    <h3 class="text-xl font-semibold mb-2">
      <a href="/news/{article.attributes.slug}">{article.attributes.title}</a>
    </h3>
    <p class="text-sm text-gray-600 mb-2">{formatDate(article.attributes.publishedAt)}</p>
    <a href={`/news/${article.attributes.slug}`}>Read more</a>
    <img
      src="https://cms.serg.paris{article.attributes.picture.data.attributes.url}"
      alt="An alt text"
      class="h-32 rounded-sm mx-auto mb-4 object-cover"
    />

    <AreasTags areas={article.attributes.areas} />
  </article>