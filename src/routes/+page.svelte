<script lang="ts">
	import type { New } from '$types/news';
	import type { Event } from '$types/events';
	import type { Home } from '$types/home';
	import { formatDateEvent } from '$lib/utils';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import image_home from '$lib/assets/images/CS_111018_7340_fff2101c55.jpg?enhanced&w=1200;800';

	export let data: {
		description: Home;
		news: New[] | null;
		events: Event[] | null;
		error?: string;
	};
	const aboutUsPaths = {
		presentation: '/about?section=presentation',
		research: '/about?section=research',
		sergLife: '/about?section=serg-life'
	};
</script>

<svelte:head>
	<title>Sustainable Economy Research Group (SERG) - Home</title>
</svelte:head>

<div class="flex flex-col md:flex-row gap-8 p-4">
	<!-- Main Content Section -->
	<div class="flex-1">
		{@html data.description.introduction}

		<h2>Research</h2>

		<Accordion.Root class="w-full mb-6">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Axis: Sustainable Mobility Systems</Accordion.Trigger>
				<Accordion.Content>
					{@html data.description.axis_mobility}
				</Accordion.Content>
			</Accordion.Item>

			<Accordion.Item value="item-2">
				<Accordion.Trigger>Axis: Low-Carbon Energy Systems</Accordion.Trigger>
				<Accordion.Content>
					{@html data.description.axis_energy}
				</Accordion.Content>
			</Accordion.Item>

			<Accordion.Item value="item-3">
				<Accordion.Trigger>Axis: Climate Change Strategy</Accordion.Trigger>
				<Accordion.Content>
					{@html data.description.axis_climate}
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		{@html data.description.conclusion}

		<a href="https://centralesupelec.hal.science/LGI">
			<enhanced:img
				src={image_home}
				alt="CentraleSupélec / Paris-Saclay University"
				sizes="(min-width:1080px) 1200px, (min-width:768px) 800px"
				class="mx-auto"
			/>
		</a>
	</div>

	<!-- Sidebar for News and Events -->
	<div class="w-full md:w-1/3 text-sm rounded shadow hover:shadow-md bg-gray-100">
		<div class="space-y-4">
			<!-- Upcoming News Section -->
			{#if data.news}
				<div class="p-4 border-b border-gray-200 border-solid">
					<h2 class="mb-4 text-xl">Latest News and Updates</h2>
					<ul class="space-y-3">
						{#each data.news as article (article.id)}
							<li>
								<a href="/news/{article.slug}">{article.title}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Events Section -->
			{#if data.events}
				<div class="p-4">
					<h2 class="mb-4 -mt-2 text-xl">Events</h2>
					<ul class="space-y-3">
						{#each data.events as event (event.id)}
							<li>
								<a href="/events/{event.slug}">{event.title}</a> - {formatDateEvent(
									event.date_start,
									event.date_end
								)}
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</div>
