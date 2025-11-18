<script lang="ts">
	import type { File } from '$types/files';

	import { FileDown } from 'lucide-svelte';

	let { files }: { files: File[] } = $props();
</script>

{#if files && files.length > 0}
	{#each files as file}
		<a href="https://cms.serg.paris{file.url}" class=" flex items-center">
			<FileDown class="mr-2" />{file.name}
		</a>
	{/each}
{/if}
