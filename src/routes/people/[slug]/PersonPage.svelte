<!-- src/components/PersonCard.svelte -->
<script lang="ts">
	import type { Person } from '$types/people';
	import AreasTags from '$lib/components/AreasTags.svelte';
	import { CMS_BASE_URL } from '$lib/config';
	// import DownloadFiles from '$lib/components/DownloadFiles.svelte';

	let { person, title }: { person: Person; title: string } = $props();

	const picture = $derived(
		person.picture?.formats?.small?.url || person.picture?.url
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

<h1>
	{title}
</h1>

{#if person.email}
	<p class="text-center">
		<a href={`mailto:${person.email}`}>{person.email}</a>
	</p>
{/if}

<p class="text-center">
	<AreasTags areas={person.areas} center={true} />
</p>

{#if person.picture}
	<a href={`/people/${person.slug}`} class="image-link">
		<img
			src="{CMS_BASE_URL}{picture}"
			srcset={pictureSrcset || undefined}
			sizes="(max-width: 768px) 256px, 320px"
			alt={title}
			loading="lazy"
			decoding="async"
			width="256"
			height="256"
		/>
	</a>
{/if}

{@html person?.bio}

<style>
	img {
		@apply w-64 h-64 rounded-full object-cover md:mr-10 mb-6 md:float-right mx-auto;
		@apply shadow-lg;
		@apply transition-all duration-300;
		@apply hover:shadow-xl hover:scale-105;
	}
</style>
