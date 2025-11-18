<!-- src/components/AreasTags.svelte -->
<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	let { areas, center = false }: { areas: any; center?: boolean } = $props();
	const items = areas.data ? areas.data : areas;
</script>

{#if items && items.length > 0}
	<div class="tags-container" class:center>
		{#each items as item}
			<Badge variant="outline" class="tag-item">{item.title}</Badge>
		{/each}
	</div>
{/if}

<style>
	.tags-container {
		@apply flex flex-wrap gap-2 justify-start;
	}

	.tags-container.center {
		@apply justify-center;
	}

	:global(.tag-item) {
		padding: 0.5rem 0.75rem !important;
		font-size: 0.875rem !important;
		line-height: 1.25rem !important;
		font-weight: 500 !important;
		border-color: #335887 !important;
		color: #003366 !important;
		background-color: white !important;
		border-radius: 0.5rem !important;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
		transition: all 0.2s ease-in-out !important;
	}

	:global(.tag-item:hover) {
		background-color: #e6eaf0 !important;
		border-color: #335887 !important;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
		transform: translateY(-1px) !important;
	}
</style>
