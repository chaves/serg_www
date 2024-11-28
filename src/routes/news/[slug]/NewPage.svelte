<!-- src/components/NewCard.svelte -->
<script lang="ts">
	import type { New } from '$types/news';
	import AreasTags from '$lib/components/AreasTags.svelte';
	import DownloadFiles from '$lib/components/DownloadFiles.svelte';
	import { formatDate } from '$lib/utils';

	export let article: New;
</script>

<h1>{article.title}</h1>

<AreasTags areas={article.areas} />

<div class="content">
	{#if article.picture}
		<img src="https://cms.serg.paris{article.picture.url}" alt="An alt text" />
	{/if}

	{@html article.description}

	<DownloadFiles files={article.attached_files} />
</div>

<style>
	img {
		@apply rounded-sm mx-auto mb-4 object-cover float-right ml-9 border-l-4 border-b-4 border-gray-200 p-6 max-h-64;
	}

	.content {
		@apply mt-3;
	}
</style>
