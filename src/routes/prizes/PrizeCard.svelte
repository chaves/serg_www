<!-- src/components/PrizeCard.svelte -->
<script lang="ts">
	import type { Prize } from '$types/prizes';
	import { CMS_BASE_URL } from '$lib/config';

	let { prize }: { prize: Prize } = $props();

	const pictureSrc = $derived(
		`${CMS_BASE_URL}${prize.picture?.formats?.thumbnail?.url || prize.picture?.url || ''}`
	);
	const pictureWidth = $derived(prize.picture?.formats?.thumbnail?.width || prize.picture?.width || 112);
	const pictureHeight = $derived(
		prize.picture?.formats?.thumbnail?.height || prize.picture?.height || 112
	);
	const pictureSrcset = $derived(
		[
			prize.picture?.formats?.thumbnail,
			prize.picture?.formats?.small,
			prize.picture?.formats?.medium
		]
			.map((format) =>
				format?.url && format?.width ? `${CMS_BASE_URL}${format.url} ${format.width}w` : null
			)
			.filter((value): value is string => Boolean(value))
			.join(', ')
	);
</script>

<article
	class="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-150 hover:shadow-md"
>
	<div class="min-w-0 flex-1">
		<p class="m-0 text-sm leading-snug text-gray-600 md:text-base">
			<span class="font-semibold text-serg_blue-700">{prize.year}</span>
			<span class="mx-1 text-gray-400">·</span>
			<span class="font-semibold text-gray-800">{prize.first_name} {prize.last_name}</span>
		</p>
		<p class="m-0 mt-1 text-base leading-relaxed text-gray-700 md:text-lg">{prize.title}</p>
	</div>
	{#if prize.picture}
		<div class="ml-2 shrink-0">
			<img
				src={pictureSrc}
				srcset={pictureSrcset || undefined}
				sizes="112px"
				alt={`${prize.first_name} ${prize.last_name} - ${prize.title}`}
				loading="lazy"
				decoding="async"
				width={pictureWidth}
				height={pictureHeight}
				class="block h-20 w-20 rounded-lg object-cover shadow-sm transition duration-150 ease-out hover:shadow-md md:h-24 md:w-24"
			/>
		</div>
	{/if}
</article>
