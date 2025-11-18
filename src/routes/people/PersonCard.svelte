<!-- src/components/PersonCard.svelte -->
<script lang="ts">
	import type { Person } from '$types/people';

	import AreasTags from '$lib/components/AreasTags.svelte';

	let { person }: { person: Person } = $props();
</script>

<div class="bg-white p-6 rounded shadow hover:shadow-md transition-shadow text-center">
	<h3 class="text-xl font-semibold mb-2">
		<a href={`/people/${person.slug}`}>
			{person.first_name}
			{person.last_name}
		</a>
		{#if person.category == 'Director'}
			<span class="text-sm">(director)</span>
		{/if}
	</h3>

	{#if person.picture}
		<a href={`/people/${person.slug}`}>
			<img
				src="https://cms.serg.paris{person.picture.formats.thumbnail.url}"
				alt={`${person.first_name} ${person.last_name} - ${person.category || 'Member'}`}
				class="w-28 h-28 rounded-full mx-auto mb-4 object-cover shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
				loading="lazy"
				decoding="async"
				width="112"
				height="112"
			/>
		</a>
	{/if}
	<AreasTags areas={person.areas} center={true} />
</div>
