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
	<p class="email">
		<a href={`mailto:${person.email}`}>{person.email}</a>
	</p>
{/if}

<div class="tags">
	<AreasTags areas={person.areas} center={true} />
</div>

<div class="profile">
	{#if person.picture}
		<div class="photo">
			<img
				src="{CMS_BASE_URL}{picture}"
				srcset={pictureSrcset || undefined}
				sizes="(max-width: 768px) 192px, 224px"
				alt={title}
				loading="lazy"
				decoding="async"
				width="224"
				height="224"
			/>
		</div>
	{/if}
	<div class="bio">
		{@html person?.bio}
	</div>
</div>

<style>
	.email {
		@apply mt-1 mb-2 text-center;
	}

	.tags {
		@apply flex justify-center py-6;
	}

	.profile {
		@apply flex flex-col md:flex-row gap-8 mt-2 items-start;
	}

	.photo {
		@apply flex-shrink-0 flex justify-center md:justify-start self-start;
	}

	img {
		@apply w-48 md:w-56 rounded-2xl;
		@apply shadow-lg;
		@apply transition-all duration-300;
		@apply hover:shadow-xl hover:scale-[1.02];
		height: auto;
	}

	.bio {
		@apply flex-1 leading-7 md:leading-8 text-gray-700;
	}
</style>
