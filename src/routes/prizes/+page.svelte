<script lang="ts">
	import type { PrizesResponse } from '../../types/prizes';

	export let data: {
		prizes: PrizesResponse | null;
		error?: string;
	};
</script>

<svelte:head>
	<title>Sustainable Economy Research Group (SERG) - Prizes</title>
</svelte:head>

<h1>Prizes</h1>

<ul class="prize-list bg-white p-5 rounded-lg shadow-md">
	{#if data.prizes}
		{#each data.prizes.data as prize}
			<li class="prize-item mb-2.5 text-lg bg-gray-100 p-1.5 odd:bg-white rounded">
				{prize.attributes.year} - <span class="font-semibold">{prize.attributes.first_name} {prize.attributes.last_name}</span> : {prize.attributes.title}
			</li>
		{/each}
	{:else if data.error}
		<li class="error-message text-red-500 font-bold">Error: {data.error}</li>
	{:else}
		<li>Loading...</li>
	{/if}
</ul>

<style>
	.prize-list {
		background-color: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		list-style: none;
	}

	.prize-item {
		margin-bottom: 10px;
		font-size: 1.1em;
		background-color: #f9f9f9;
		padding: 6px;
	}

	.prize-item:nth-child(odd) {
		background-color: white;
	}

	.error-message {
		color: red;
		font-weight: bold;
	}
</style>