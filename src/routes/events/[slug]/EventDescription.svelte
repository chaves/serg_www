<script lang="ts">
	import type { Event } from '$types/events';

	import { formatDateEvent } from '$lib/utils';

	import { Calendar } from 'lucide-svelte';
	import PageDescription from '$lib/components/PageDescription.svelte';

	let { event }: { event: Event } = $props();

	const pictureUrl = $derived(event.picture?.formats?.small?.url || event.picture?.url);
</script>

{#snippet calendar()}
	<p class="mb-1 text-center font-bold text-xl">
		<Calendar class="inline-block mr-1 -mt-1 w-6 h-6" />
		{formatDateEvent(event.date_start, event.date_end)}
	</p>
{/snippet}

<PageDescription
	title={event.title}
	description={event.description}
	areas={event.areas}
	attachedFiles={event.attached_files}
	publishedAt={event.publishedAt}
	{pictureUrl}
	{calendar}
/>
