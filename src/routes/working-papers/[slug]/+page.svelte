<script lang="ts">
	import type { PageData } from './$types';
	import PaperPage from './PaperPage.svelte';

	let { data }: { data: PageData } = $props();

	const title = data.paper ? data.paper.title : 'Paper not found';

</script>

<svelte:head>
    <title>SERG - {title}</title>
  </svelte:head>

<h1>
	{title}
</h1>

{#if data.paper}
	<PaperPage paper={data.paper} />
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}