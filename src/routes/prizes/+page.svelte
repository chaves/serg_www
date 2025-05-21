<script lang="ts">
	import type { PrizesResponse } from '$types/prizes';

	import PrizeCard from './PrizeCard.svelte';

	export let data: {
		prizes: PrizesResponse | null;
		error?: string;
	};
</script>

<svelte:head>
	<title>Sustainable Economy Research Group (SERG) - Prizes</title>
</svelte:head>

<h1>Prizes</h1>

<ul class="prize-list">
	{#if data.prizes}
		{#each data.prizes.data as prize}
			<PrizeCard {prize} />
		{/each}
	{:else if data.error}
		<li class="error-message text-red-500 font-bold">Error: {data.error}</li>
	{:else}
		<li>Loading...</li>
	{/if}
</ul>

<style>
	.error-message {
		color: red;
		font-weight: bold;
	}
</style>
