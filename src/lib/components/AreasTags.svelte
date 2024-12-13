<!-- src/components/AreasTags.svelte -->
<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	export let areas;
	const items = areas.data ? areas.data : areas;
</script>

{#if items && items.length > 0}
	{#each items as item}
		<Badge variant="outline" class="p-1 mr-2">{item.title}</Badge>
	{/each}
{/if}
