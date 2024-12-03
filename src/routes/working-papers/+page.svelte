<script lang="ts">

  import DownloadFiles from '$lib/components/DownloadFiles.svelte';
  import AreasTags from '$lib/components/AreasTags.svelte';
  import type { Paper } from '$types/papers';

	export let data: {
		papers : Paper[];
		error?: string;
	};

</script>

  <svelte:head>
    <title>Sustainable Economy Research Group (SERG) - Working Papers</title>
  </svelte:head>

  <h1>Working Papers</h1>

  <div class="space-y-6">
    {#each data.papers as paper (paper.id)}
      <div class="bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-2">
          <a href={`/working-papers/${paper.slug}`}>{paper.title}</a>
        </h3>
        <p class="text-gray-600 mb-2">{paper.year} - {paper.authors}</p>
        <AreasTags areas={paper.areas} />
      </div>
    {/each}
  </div>