<!-- src/components/NewCard.svelte -->
<script lang="ts">
	import type { New } from '$types/news';

	import Card from '$lib/components/Card.svelte';

	let { article }: { article: New } = $props();
</script>

<Card
	title={article.title}
	slug={article.slug}
	path="news"
	areas={article.areas}
	publishedAt={article.publishedAt}
	picture={article.picture}
	description={article.description}
/>
