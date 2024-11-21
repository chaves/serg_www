<script lang="ts">
	import type { Paper } from '$types/papers';
	import PaperPage from './PaperPage.svelte';

	export let data: {
		paper: Paper | null,
		error?: string;
	};

	const title = data.paper ? data.paper.attributes.title : 'Paper not found';

</script>

<svelte:head>
    <title>SERG - {title}</title>
  </svelte:head>

<h1>
	{title}
</h1>

{#if data.paper}
	<PaperPage paper={data.paper.attributes} />
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}