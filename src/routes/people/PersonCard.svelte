<!-- src/components/PersonCard.svelte -->
<script lang="ts">
	import type { Person } from '$types/people';
	import AreasTags from '$lib/components/AreasTags.svelte';
	import { CMS_BASE_URL } from '$lib/config';

	let { person }: { person: Person } = $props();

	const pictureSrc = $derived(
		`${CMS_BASE_URL}${person.picture?.formats?.thumbnail?.url || person.picture?.url || ''}`
	);
	const pictureSrcset = $derived(
		[
			person.picture?.formats?.thumbnail,
			person.picture?.formats?.small,
			person.picture?.formats?.medium
		]
			.map((format) =>
				format?.url && format?.width ? `${CMS_BASE_URL}${format.url} ${format.width}w` : null
			)
			.filter((value): value is string => Boolean(value))
			.join(', ')
	);
</script>

<div
	class="bg-white p-6 rounded-lg border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 text-center"
>
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
				src={pictureSrc}
				srcset={pictureSrcset || undefined}
				sizes="112px"
				alt={`${person.first_name} ${person.last_name} - ${person.category || 'Member'}`}
				class="w-28 h-28 rounded-full mx-auto mb-4 object-cover shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
				loading="lazy"
				decoding="async"
				width="112"
				height="112"
			/>
		</a>
	{/if}
	<AreasTags areas={person.areas} center={true} />
</div>
