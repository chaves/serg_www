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

{#if data.prizes?.data?.length}
	<ul class="m-0 w-full max-w-none list-none space-y-3 p-0" aria-label="Prizes and awards">
		{#each data.prizes.data as prize}
			<li class="m-0 p-0">
				<PrizeCard {prize} />
			</li>
		{/each}
	</ul>
{:else}
	<p class="mt-8 text-center text-gray-600">No prizes available.</p>
{/if}
