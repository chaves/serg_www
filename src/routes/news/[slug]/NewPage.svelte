<!-- src/components/NewCard.svelte -->
<script lang="ts">
	import type { New } from '$types/news';
	import AreasTags from '$lib/components/AreasTags.svelte';
	import DownloadFiles from '$lib/components/DownloadFiles.svelte';
	import { formatDate } from '$lib/utils';

	export let article: New;
</script>

<h1>{article.title}</h1>

{#if article.picture}
<img
  src="https://cms.serg.paris{article.picture.url}"
  alt="An alt text"
/>
{/if}

<div>{@html article.description}</div>

<DownloadFiles files={article.attached_files} />
<AreasTags areas={article.areas} />

<style>
  img {
	@apply rounded-sm mx-auto mb-4 object-cover float-right ml-9 border-l-2 p-6 max-h-56
  }
</style>