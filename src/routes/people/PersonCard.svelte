<!-- src/components/PersonCard.svelte -->
<script lang="ts">
	import type { Person } from '$types/people';

	import AreasTags from '$lib/components/AreasTags.svelte';

	export let person: Person;
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
				alt="An alt text"
				class="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
			/>
		</a>
	{/if}
  <AreasTags areas={person.areas} />
</div>
