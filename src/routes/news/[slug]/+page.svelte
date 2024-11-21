<script lang="ts">
	import type { New } from '../../../types/news';

	export let data: {
		new: New | null;
		error?: string;
	};
	const title = data.new ? data.new.attributes.title : 'New not found';
</script>

<svelte:head>
	<title>SERG - {title}</title>
</svelte:head>

{#if data.new}
<h1 class="text-left">{title}</h1>
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}
