<script lang="ts">
	import type { New } from '../../../types/news';

	export let data: {
		new: New | null;
		error?: string;
	};
</script>

<svelte:head>
	<title>Sustainable Economy Research Group (SERG) - {data.new.attributes.title}</title>
</svelte:head>

{#if data.new}
<h1 class="text-left">{data.new.attributes.title}</h1>
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}
