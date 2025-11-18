<script lang="ts">
	import type { PageData } from './$types';
	import NewCard from './NewCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title="Latest News and Updates"
	description="Latest news, updates, and announcements from the Sustainable Economy Research Group (SERG)."
/>

  <h1>Latest News and Updates</h1>
  {#if data.news}
	<div class="space-y-6">
	  {#each data.news as article}
		<NewCard {article} />
	  {/each}
	</div>
  {/if}