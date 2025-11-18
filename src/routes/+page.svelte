<script lang="ts">
	import type { PageData } from './$types';
	import { formatDateEvent } from '$lib/utils';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	// @ts-ignore - enhanced image import with query parameters
	import image_home from '$lib/assets/images/CS_111018_7340_fff2101c55.jpg?enhanced&w=1200;800';
	import SEO from '$lib/components/SEO.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';

	let { data }: { data: PageData } = $props();
	const aboutUsPaths = {
		presentation: '/about?section=presentation',
		research: '/about?section=research',
		sergLife: '/about?section=serg-life'
	};
</script>

<SEO
	title="Sustainable Economy Research Group (SERG) - Home"
	description="Research group at CentraleSupélec / Paris-Saclay University focusing on sustainable economy, mobility systems, low-carbon energy, and climate change strategy."
/>

<StructuredData type="Organization" />

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

		<a
			href="https://centralesupelec.hal.science/LGI"
			class="block"
			aria-label="Visit CentraleSupélec HAL Science repository"
		>
			<enhanced:img
				src={image_home}
				alt="CentraleSupélec / Paris-Saclay University"
				sizes="(min-width:1080px) 1200px, (min-width:768px) 800px"
				class="mx-auto rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
			/>
		</a>
	</div>

	<!-- Sidebar for News and Events -->
	<div
		class="w-full md:w-1/3 text-sm rounded-xl shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-serg_blue-50 border border-serg_blue-100 transition-all duration-300"
	>
		<div class="space-y-4 p-4">
			<!-- Upcoming News Section -->
			{#if data.news}
				<div class="p-4 border-b border-serg_blue-200 border-solid">
					<h2 class="mb-4 text-xl font-bold text-serg_blue-700 flex items-center gap-2">
						<span class="w-1 h-6 bg-gradient-to-b from-serg_blue-500 to-serg_purple rounded-full"
						></span>
						Latest News and Updates
					</h2>
					<ul class="space-y-3 -ml-4 pl-4 list-none">
						{#each data.news as article (article.id)}
							<li class="text-base pl-3">
								<a
									href="/news/{article.slug}"
									class="text-serg_blue-600 hover:text-serg_blue-700 font-medium transition-colors"
								>
									{article.title}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Events Section -->
			{#if data.events}
				<div class="p-4">
					<h2 class="mb-4 text-xl font-bold text-serg_blue-700 flex items-center gap-2">
						<span class="w-1 h-6 bg-gradient-to-b from-serg_blue-500 to-serg_purple rounded-full"
						></span>
						Events
					</h2>
					<ul class="space-y-3 -ml-4 pl-4 list-none">
						{#each data.events as event (event.id)}
							<li class="text-base pl-3">
								<a
									href="/events/{event.slug}"
									class="text-serg_blue-600 hover:text-serg_blue-700 font-medium transition-colors"
								>
									{event.title}
								</a>
								<span class="text-gray-600 text-sm block mt-1">
									{formatDateEvent(event.date_start, event.date_end)}
								</span>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</div>
