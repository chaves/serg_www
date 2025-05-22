<script lang="ts">
	import type { Event } from '$types/events';

	import { formatDateEvent } from '$lib/utils';

	import { Calendar } from 'lucide-svelte';
	import PageDescription from '$lib/components/PageDescription.svelte';

	export let event: Event;

	const pictureUrl = event.picture?.formats?.small?.url || event.picture?.url;
</script>

<PageDescription
	title={event.title}
	description={event.description}
	areas={event.areas}
	attachedFiles={event.attached_files}
	publishedAt={event.publishedAt}
	{pictureUrl}
>
	<slot name="calendar">
		<p class="mb-1 text-center font-bold text-xl">
			<Calendar class="inline-block mr-1 -mt-1 w-6 h-6" />
			{formatDateEvent(event.date_start, event.date_end)}
		</p>
	</slot>
</PageDescription>
