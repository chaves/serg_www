<!-- src/components/NewCard.svelte -->
<script lang="ts">
	import type { New } from '$types/news';
	import AreasTags from '$lib/components/AreasTags.svelte';
	import DownloadFiles from '$lib/components/DownloadFiles.svelte';
	import { formatDate } from '$lib/utils';

	export let article: New;
</script>

<h1>{article.title}</h1>

<div>{@html article.description}</div>
{#if article.picture}
	<div>{article.picture.url}</div>
{/if}

<DownloadFiles files={article.attached_files} />
<AreasTags areas={article.areas} />
