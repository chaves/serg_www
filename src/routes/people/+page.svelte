<script lang="ts">
	import type { PageData } from './$types';
	import type { Person } from '$types/people';
	import PersonCard from './PersonCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data }: { data: PageData } = $props();

	const people = $derived(
		(data.people || []).slice().sort((a: Person, b: Person) => a.last_name.localeCompare(b.last_name))
	);

	function byCategory(list: Person[], category: string) {
		return list.filter((person) => person.category === category);
	}

	const directors = $derived(byCategory(people, 'Director'));
	const researchTeam = $derived(byCategory(people, 'Research Team'));
	const researchers = $derived([...directors, ...researchTeam]);
	const students = $derived(byCategory(people, 'PhD Students'));
	const prev_students = $derived(byCategory(people, 'Previous PhD Students'));
	const post_docs = $derived(byCategory(people, 'Postdoctoral researchers'));
	const visitors = $derived(byCategory(people, 'Visiting Academics'));
	const associates = $derived(byCategory(people, 'Associate Researchers'));
	const formers = $derived(byCategory(people, 'Former Researchers'));
</script>

<SEO
	title="People"
	description="Meet the researchers, faculty, students, and associates of the Sustainable Economy Research Group (SERG) at CentraleSupélec."
/>

<h1 class="people-page-title">People</h1>

{#if people}
	{#if researchers}
		<h2 class="section-title">Research Team</h2>
		<div class="person">
			{#each researchers as person (person.id)}
				<PersonCard {person} />
			{:else}
				<p>No researchers found.</p>
			{/each}
		</div>
	{/if}

	{#if associates}
		<h2 class="section-title">Associate Researchers</h2>
		<div class="person">
			{#each associates as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if post_docs}
		<h2 class="section-title">Postdoctoral researchers</h2>
		<div class="person">
			{#each post_docs as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if students}
		<h2 class="section-title">PhD Students</h2>
		<div class="person">
			{#each students as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if formers}
		<h2 class="section-title">Former Researchers</h2>
		<div class="person">
			{#each formers as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if visitors}
		<h2 class="section-title">Visiting Academics</h2>
		<div class="person">
			{#each visitors as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if prev_students}
		<h2 class="section-title">Previous PhD Students</h2>
		<div class="person">
			{#each prev_students as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}
{:else}
	<p>No team members available.</p>
{/if}

<style>
	.people-page-title {
		@apply text-center text-3xl md:text-4xl lg:text-5xl font-semibold mb-7 md:mb-9;
	}

	.section-title {
		@apply text-center text-lg md:text-xl lg:text-2xl font-semibold mb-4 mt-9 md:mt-10 text-serg_blue-700;
		@apply uppercase tracking-[0.03em];
	}

	.person {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 p-6 md:p-7 rounded-xl border border-gray-200/80;
	}
</style>
