<script lang="ts">
	import type { PrizesResponse } from '$types/prizes';

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
			<div class="prize-item">
				<div class="price-text">
					{prize.year} - <span class="font-semibold">{prize.first_name} {prize.last_name}</span> : {prize.title}
				</div>
				{#if prize.picture}
					<div class="picture">
						<img
							src={`https://cms.serg.paris${prize.picture.formats.thumbnail.url}`}
							alt={`${prize.first_name} ${prize.last_name}`}
						/>
					</div>
				{/if}
			</div>
		{/each}
	{:else if data.error}
		<li class="error-message text-red-500 font-bold">Error: {data.error}</li>
	{:else}
		<li>Loading...</li>
	{/if}
</ul>

<style>
	.prize-item {
		background-color: #f9f9f9;
		@apply flex items-center justify-between p-2 mb-2 rounded;
	}

	.prize-item:nth-child(odd) {
		background-color: white;
	}

	.price-text {
		@apply text-lg flex-1;
	}

	.picture {
		@apply ml-4;
	}

	img {
		@apply rounded-xl h-20 md:h-28 object-cover;
	}

	.error-message {
		color: red;
		font-weight: bold;
	}
</style>
