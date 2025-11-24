<script lang="ts">
	import type { File } from '$types/files';
	import { CMS_BASE_URL } from '$lib/config';
	import { FileDown } from 'lucide-svelte';

	let { files }: { files: File[] } = $props();
</script>

{#if files && files.length > 0}
	{#each files as file}
		<a href="{CMS_BASE_URL}{file.url}" class=" flex items-center">
			<FileDown class="mr-2" />{file.name}
		</a>
	{/each}
{/if}
