<script lang="ts">
	import type { New } from '$types/news';

	import PageDescription from '$lib/components/PageDescription.svelte';

	export let article: New;

	const pictureUrl = article.picture?.formats?.small?.url || article.picture?.url;
</script>

<PageDescription
	title={article.title}
	description={article.description}
	areas={article.areas}
	attachedFiles={article.attached_files}
	publishedAt={article.publishedAt}
	{pictureUrl}
/>
