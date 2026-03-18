<script lang="ts">
	import type { PageData } from './$types';
	import PrizeCard from './PrizeCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title="Prizes"
	description="Awards and prizes received by members of the Sustainable Economy Research Group (SERG) for their research contributions."
/>

<h1>Prizes</h1>

<ul class="prize-list">
	{#if data.prizes}
		{#each data.prizes.data as prize}
			<PrizeCard {prize} />
		{/each}
	{:else}
		<li>No prizes available.</li>
	{/if}
</ul>
