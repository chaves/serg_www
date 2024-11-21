<!-- src/components/AreasTags.svelte -->
<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	export let areas;
	const items = areas.data ? areas.data : areas
</script>

{#if items}
	{#each items as item}
		<Badge variant="outline">{item.attributes.title}</Badge>
	{/each}
{/if}