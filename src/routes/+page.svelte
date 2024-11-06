<script lang="ts">
	import type { NewsResponse } from '../types/news';
	import type { EventsResponse } from '../types/events';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	export let data: {
		description: any;
		news: NewsResponse | null;
		events: EventsResponse | null;
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
		<p>
			The work of the Sustainable Economy Research Group (S.E.R.G.) falls within the fields of
			economics and management, with a particular focus on engineering sciences given the specialism
			of its host institution, CentraleSup&eacute;lec / Paris-Saclay University. The team works
			within the cross-disciplinary Industrial Engineering Department (LGI in French) in a dialogue
			between economics / management / technological, environmental and industrial issues.
		</p>
		<p>
			The fact that the S.E.R.G. is based at the heart of the LGI greatly encourages fruitful
			interactions and collaborations with the socio-economic and industrial world.
		</p>
		<p>
			More specifically, the S.E.R.G. focuses on the evaluation of innovations, including their
			environmental and socio-economic impacts on organizations, industries and markets, with
			particular emphasis on eco-innovations and the ecological transition, for the two key sectors
			of mobility and energy. The group works in 4 research axis.
		</p>

		<h2>Research</h2>

		<Accordion.Root class="w-full">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Axis: Innovations</Accordion.Trigger>
				<Accordion.Content>
					<p>A research theme that cuts across all members of the S.E.R.G.</p>
					<p>
						This axis Economics and Management of Innovations is dedicated to the analysis of
						technical progress - from conception to diffusion - and the performance of
						organizations.
					</p>
					<p>
						We seek to untangle the rationale behind economic agents' investment and green
						innovation decisions, and their microeconomic impact on the organization of production,
						firms growth and operational efficiency.
					</p>
					<p>
						The large diversity of fields on which the S.E.R.G.'s researchers rely - from strategy
						in management sciences to ecological and industrial economics, from institutional
						economics to applied mathematics to economics - contributes to building a multifaceted
						understanding of innovations and their consequences.
					</p>
				</Accordion.Content>
			</Accordion.Item>

			<Accordion.Item value="item-2">
				<Accordion.Trigger>Axis: Sustainable mobility</Accordion.Trigger>
				<Accordion.Content>
					<p>
						With the axis Economics and Management of Sustainable Mobility, research at S.E.R.G. is
						focused on low-carbon mobility, electric autonomous shuttles, mobility as a service
						(MaaS), and the mobility-electricity nexus through storage. The chair Armand Peugeot and
						the European projects Avenue and Ultimo notably support this applied research.
					</p>
					<p>
						This axis builds on a variety of methods: technical-economic and econometric studies,
						strategic analysis, including stakeholders and the evaluation of environmental
						externalities.
					</p>
				</Accordion.Content>
			</Accordion.Item>

			<Accordion.Item value="item-3">
				<Accordion.Trigger>Axis: Low-carbon energy systems</Accordion.Trigger>
				<Accordion.Content>
					<p>
						The S.E.R.G.'s Economics and Management of Low-carbon Energy Systems axis applies
						technical-economic modeling, system dynamics and game theory tools to study energy
						systems and infrastructures facing climate change. Technological options are studied -
						electricity, hydrogen, storage, nuclear, and renewable- as well as the corresponding
						market design, industrial organization, regulations, and public policies.
					</p>
					<p>
						Industrial partnerships, especially through PhD funding (CEA, EDF, RTE), support this
						axis.
					</p>
				</Accordion.Content>
			</Accordion.Item>

			<Accordion.Item value="item-4">
				<Accordion.Trigger>Axis: Climate economics &amp; management</Accordion.Trigger>
				<Accordion.Content>
					<p>
						Newest fully-fletched research axis, the Economics and Management of Climate axis
						encompasses S.E.R.G.'s continued and growing research dealing with climate transition,
						carbon accounting research, carbon capture and negative emissions technologies and their
						respective financing schemes and institutional structures. In collaboration with our
						academic partners (Greenly, ADEME, CIRED, IFPEN, Climate Economics Chair), this axis
						aims to analyze the economics of the transition towards net zero and the swift
						management of hard-to-abate emissions.
					</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<h2 class="mt-4">SERG's life &amp; Partners</h2>
		<p>
			The Group has an original positioning regarding its scientific community thanks to its
			numerous research applications and partnerships: Our research attracts industrial partners
			(Stellantis, RTE, CEA, EDF, Engie, etc.) as well as academic partners at national
			(Paris-Dauphine, IFPEN, Agro Paris Tech, Mines Paris Tech, ENS Paris-Saclay, UVSQ, etc.) and
			international (University of Delaware, European University Institute, Universitat Pompeu
			Fabra, etc.) levels.
		</p>
		<p>
			Taking advantage of this rich network, the S.E.R.G. serves as a platform for discussions in
			and outside academia. Hence, several organized events structure the S.E.R.G.'s life: Our
			biannual Working Paper Days, annual prestige conference Marcel Boiteux Lectures, and many
			other international conferences (IAEE, 2021, 2025). Discover our events.
		</p>
		<p>
			S.E.R.G.'s researchers are also active in their communities outside the lab: Find out our
			latest news and Prizes!
		</p>

		<h2>SERG's members</h2>
		<p>
			The S.E.R.G. had 31 members: 6 Professors, 1 Associate Professor, 3 Post-docs and 21 PhD
			candidates ; 32% women and 68% men ; of 9 nationalities: France, Germany, Tunisia, Nigeria,
			Ghana, Lebanon, Chile, Mexico, Peru... We also had the chance to welcome researchers from
			Brazil or the USA. Over the past 5 years, 25 theses were defended and 7 post-docs were members
			of the Group.
		</p>
		<p>
			Reflecting the interdisciplinary approach of the S.E.R.G., we come from various backgrounds:
			engineering (electrical, civil, industrial...), economics (institutional, neo-Keynesian,
			ecological economists...), management sciences, applied mathematics...
		</p>
	</div>

	<!-- Sidebar for News and Events -->
	<div class="w-full md:w-1/3 text-sm rounded shadow hover:shadow-md bg-gray-100">
		<div class="space-y-4">
			<!-- Upcoming News Section -->
			{#if data.news.data}
				<div class="p-4 border-b border-gray-200 border-solid">
					<h3>Upcoming News</h3>
					<ul class="space-y-3">
						{#each data.news.data as article (article.id)}
							<li class="font-semibold">
								<a href="/news/{article.attributes.slug}">{article.attributes.title}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Events Section -->
			{#if data.events.data}
				<div class="p-4">
					<h3>Events</h3>
					<ul class="space-y-3">
						{#each data.events.data as events (events.id)}
							<li class="font-semibold">
								<a href="/events/{events.attributes.slug}">{events.attributes.title}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	h2, h3 {
		@apply text-lg font-bold mb-2 text-serg_green-700;
	}
</style>
