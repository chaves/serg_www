<script lang="ts">
	import type { File } from '$types/files';

	import { FileDown } from 'lucide-svelte';

	export let files: File[];
</script>

{#if files && files.length > 0}
	{#each files.data as file}
		<a href="https://cms.serg.paris{file.url}" class=" flex items-center">
			<FileDown class="mr-2" /> Download
		</a>
	{/each}
{/if}
