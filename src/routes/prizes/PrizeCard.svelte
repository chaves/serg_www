<!-- src/components/PrizeCard.svelte -->
<script lang="ts">
	import type { Prize } from '$types/prizes';
	import AreasTags from '$lib/components/AreasTags.svelte';
	import { CMS_BASE_URL } from '$lib/config';

	let { prize }: { prize: Prize } = $props();
</script>

<article>
	<div class="content">
		{prize.year} - <span class="font-semibold">{prize.first_name} {prize.last_name}</span> : {prize.title}
	</div>
	{#if prize.picture}
		<div class="picture">
			<img
				src={`${CMS_BASE_URL}${prize.picture.formats.thumbnail.url}`}
				alt={`${prize.first_name} ${prize.last_name} - ${prize.title}`}
				loading="lazy"
				decoding="async"
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
		@apply shadow-md;
		@apply transition-all duration-300;
		@apply hover:shadow-lg hover:scale-105;
	}
</style>
