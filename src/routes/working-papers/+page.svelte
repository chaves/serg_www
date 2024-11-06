<script lang="ts">

  import { flattenObj } from '$lib/utils';
  import DownloadFiles from '$lib/components/DownloadFiles.svelte';

	export let data: {
		papers;
		error?: string;
	};

  const papers = flattenObj(data.papers.data);
</script>

  <svelte:head>
    <title>Sustainable Economy Research Group (SERG) - Working Papers</title>
  </svelte:head>

  <h1>Working Papers</h1>

  <div class="space-y-6">
    {#each papers as paper (paper.id)}
      <div class="bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-2">{paper.title}</h3>
        <p class="text-gray-600 mb-2">Authors: {paper.authors}</p>
        <p class="text-sm text-gray-500 mb-4">{paper.year}</p>
        <DownloadFiles files={paper.files} />
      </div>
    {/each}
  </div>