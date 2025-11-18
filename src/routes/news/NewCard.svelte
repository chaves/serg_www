<!-- src/components/NewCard.svelte -->
<script lang="ts">
	import type { New } from '$types/news';

	import Card from '$lib/components/Card.svelte';

	let { article }: { article: New } = $props();

	const pictureUrl = article.picture?.formats?.small?.url || article.picture?.url;
</script>

<Card
	title={article.title}
	slug={article.slug}
	path="news"
	areas={article.areas}
	publishedAt={article.publishedAt}
	{pictureUrl}
	description={article.description}
/>
