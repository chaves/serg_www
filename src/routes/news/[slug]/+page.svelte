<script lang="ts">
	import type { New } from '$types/news';
	import NewPage from './NewPage.svelte';

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

<NewPage article={data.new} />

{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}
