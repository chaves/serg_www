<script lang="ts">
	import type { PageData } from './$types';
	import { filterRecordsByKey, sortByKey } from '$lib/utils';
	import PersonCard from './PersonCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data }: { data: PageData } = $props();

	const people = sortByKey(data.people, 'last_name');

	const directors = filterRecordsByKey(people, 'category', 'Director');
	const researchTeam = filterRecordsByKey(people, 'category', 'Research Team');
	const researchers = [...directors, ...researchTeam];
	const students = filterRecordsByKey(people, 'category', 'PhD Students');
	const prev_students = filterRecordsByKey(people, 'category', 'Previous PhD Students');
	const post_docs = filterRecordsByKey(people, 'category', 'Postdoctoral researchers');
	const visitors = filterRecordsByKey(people, 'category', 'Visiting Academics');
	const associates = filterRecordsByKey(people, 'category', 'Associate Researchers');
	const formers = filterRecordsByKey(people, 'category', 'Former Researchers');
</script>

<SEO
	title="Our Team"
	description="Meet the researchers, faculty, students, and associates of the Sustainable Economy Research Group (SERG) at CentraleSupélec."
/>

<h1 class="text-xl md:text-2xl font-bold mb-2 text-center">Our Team</h1>

{#if people}
	{#if researchers}
		<h2 class="">Research Team</h2>
		<div class="person">
			{#each researchers as person (person.id)}
				<PersonCard {person} />
			{:else}
				<p>No researchers found.</p>
			{/each}
		</div>
	{/if}

	{#if associates}
		<h2 class="mt-6">Associate Researchers</h2>
		<div class="person">
			{#each associates as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if post_docs}
		<h2 class="mt-6">Postdoctoral researchers</h2>
		<div class="person">
			{#each post_docs as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if students}
		<h2 class="mt-6">PhD Students</h2>
		<div class="person">
			{#each students as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if formers}
		<h2 class="mt-6">Former Researchers</h2>
		<div class="person">
			{#each formers as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if visitors}
		<h2 class="mt-6">Visiting Academics</h2>
		<div class="person">
			{#each visitors as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}

	{#if prev_students}
		<h2 class="mt-6">Previous PhD Students</h2>
		<div class="person">
			{#each prev_students as person}
				<PersonCard {person} />
			{/each}
		</div>
	{/if}
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}

<style>
	h2 {
		@apply text-lg md:text-xl font-bold mb-3;
	}
	.person {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-100 p-6 rounded-lg;
	}
</style>
