<!-- src/components/PersonCard.svelte -->
<script lang="ts">
	import type { Paper } from '$types/papers';
	import AreasTags from '$lib/components/AreasTags.svelte';
	import DownloadFiles from '$lib/components/DownloadFiles.svelte';
	let { paper }: { paper: Paper } = $props();
</script>

<div class="tags">
	<AreasTags areas={paper.areas} center />
</div>

<p class="meta">{paper.year} · {paper.authors}</p>

<div class="description">
	{@html paper.abstract}
</div>

<DownloadFiles files={paper.files} />

<style>
	.tags {
		@apply py-4;
	}

	.meta {
		max-width: none;
		@apply mt-3 mb-8 text-center text-base md:text-lg text-gray-600;
		@apply border-b border-gray-200 pb-6;
	}

	.description {
		@apply mt-6 mx-auto max-w-3xl;
		@apply leading-7 md:leading-8;
		@apply text-gray-700;
	}

	.description :global(p) {
		@apply mb-5;
		@apply leading-7 md:leading-8;
		max-width: none;
	}
</style>
