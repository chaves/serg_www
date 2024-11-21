<script lang="ts">
	import type { New } from '$types/news';
	import NewCard from './NewCard.svelte';

	export let data: {
	  news: New[] | null;
	  error?: string;
	};
  </script>

  <svelte:head>
	<title>SERG - Latest News and Updates</title>
  </svelte:head>

  <h1>Latest News and Updates</h1>
  {#if data.news}
	<div class="space-y-6">
	  {#each data.news as article}
		<NewCard {article} />
	  {/each}
	</div>
  {/if}