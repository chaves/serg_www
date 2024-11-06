<script lang="ts">
	import { FileDown } from 'lucide-svelte';

	export let files: any[];
</script>

{#if files}
	{#each files as file}
    <a href=https://cms.serg.paris{file.attributes.url} class=" flex items-center">
		<FileDown class="mr-2" /> Download
	</a>
    {/each}

{/if}
