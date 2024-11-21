<!-- src/components/AreasTags.svelte -->
<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
	export let areas;
</script>

{#if  areas}

{#each areas as area}
        <Badge variant="outline">{area.attributes.title}</Badge>
{/each}
{/if}
