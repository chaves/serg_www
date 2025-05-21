<!-- src/components/PrizeCard.svelte -->
<script lang="ts">
	import type { Prize } from '$types/prizes';

	import AreasTags from '$lib/components/AreasTags.svelte';

	export let prize: Prize;
</script>

<article>
	<div class="content">
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
</article>

<style>
	article {
		background-color: #f9f9f9;
		@apply flex items-center justify-between p-2 mb-2 rounded;
	}

	article:nth-child(odd) {
		background-color: white;
	}

	.content {
		@apply text-lg flex-1;
	}

	.picture {
		@apply ml-4;
	}

	img {
		@apply rounded-xl h-20 md:h-28 object-cover;
	}
</style>
