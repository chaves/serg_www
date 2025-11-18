<!-- src/components/PersonCard.svelte -->
<script lang="ts">
	import type { Person } from '$types/people';
	import AreasTags from '$lib/components/AreasTags.svelte';
	// import DownloadFiles from '$lib/components/DownloadFiles.svelte';

	let { person, title }: { person: Person; title: string } = $props();

	let picture = person.picture.url;

	if (person.picture.formats.small) {
		picture = person.picture.formats.small.url;
	}
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
	<AreasTags areas={person.areas} />
</p>

{#if person.picture}
	<a href={`/people/${person.slug}`} class="image-link">
		<img
			src="https://cms.serg.paris{picture}"
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
