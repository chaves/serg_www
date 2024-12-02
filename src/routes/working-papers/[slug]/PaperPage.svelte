<!-- src/components/PersonCard.svelte -->
<script lang="ts">
	import type { Paper } from '$types/papers';
	import AreasTags from '$lib/components/AreasTags.svelte';
	import DownloadFiles from '$lib/components/DownloadFiles.svelte';
	export let paper: Paper;
</script>

<AreasTags areas={paper.areas} />

<p class="mt-3">{paper.year} - {paper.authors}</p>

{@html paper.abstract}

<DownloadFiles files={paper.files} />
<style>
</style>
