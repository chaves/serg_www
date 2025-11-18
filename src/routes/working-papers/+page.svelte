<script lang="ts">
	import type { PageData } from './$types';
	import DownloadFiles from '$lib/components/DownloadFiles.svelte';
	import AreasTags from '$lib/components/AreasTags.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title="Working Papers"
	description="Research working papers and publications from the Sustainable Economy Research Group (SERG) on sustainable economy, mobility, energy, and climate change."
/>

<h1>Working Papers</h1>

<div class="space-y-6">
	{#each data.papers as paper (paper.id)}
		<div class="bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
			<h3 class="text-xl font-semibold mb-2">
				<a href={`/working-papers/${paper.slug}`}>{paper.title}</a>
			</h3>
			<p class="text-gray-600 mb-2">{paper.year} - {paper.authors}</p>
			<p class="text-gray-600 mb-2"><DownloadFiles files={paper.files} /></p>
			<AreasTags areas={paper.areas} />
		</div>
	{/each}
</div>
