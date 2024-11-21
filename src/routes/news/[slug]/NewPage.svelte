<!-- src/components/NewCard.svelte -->
<script lang="ts">
    import type { New } from '$types/news';
    import AreasTags from '$lib/components/AreasTags.svelte';
    import DownloadFiles from '$lib/components/DownloadFiles.svelte';
    import { formatDate } from '$lib/utils';

    export let article: New;
  </script>

<h1>{article.attributes.title}</h1>

<div>{@html article.attributes.description}</div>

<div>{article.attributes.picture.data.attributes.url}</div>

<DownloadFiles files={article.attributes.attached_files} />
<AreasTags areas={article.attributes.areas} />