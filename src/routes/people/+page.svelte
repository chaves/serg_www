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
	title="Our Team"
	description="Meet the researchers, faculty, students, and associates of the Sustainable Economy Research Group (SERG) at CentraleSupélec."
/>

<h1>Our Team</h1>

{#if people}
	{#if researchers}
		<h2 class="text-center">Research Team</h2>
		<div class="person">
			{#each researchers as person (person.id)}
				<PersonCard {person} />
			{:else}
				<p>No researchers found.</p>
			{/each}
		</div>
	{/if}

	{#if associates}
		<h2 class="text-center">Associate Researchers</h2>
		<div class="person">
			{#each associates as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if post_docs}
		<h2 class="text-center">Postdoctoral researchers</h2>
		<div class="person">
			{#each post_docs as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if students}
		<h2 class="text-center">PhD Students</h2>
		<div class="person">
			{#each students as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if formers}
		<h2 class="text-center">Former Researchers</h2>
		<div class="person">
			{#each formers as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if visitors}
		<h2 class="text-center">Visiting Academics</h2>
		<div class="person">
			{#each visitors as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if prev_students}
		<h2 class="text-center">Previous PhD Students</h2>
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
	h2 {
		@apply text-2xl md:text-3xl lg:text-4xl font-bold mb-3 mt-8 md:mt-10;
	}
	.person {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-100 p-6 rounded-lg;
	}
</style>
