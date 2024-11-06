<script lang="ts">
	import type { Person, PersonAttributes } from '$types/people';
	import { flattenObj } from '$lib/utils';
	import PersonPage from '$lib/components/PersonPage.svelte';

	export let data: {
		person: Person | null;
		error?: string;
	};

	const person: PersonAttributes = data.person ? flattenObj(data.person) : {} as PersonAttributes;

</script>

<h1>
	{person?.first_name} {person?.last_name}
</h1>

{#if person}
	<PersonPage {person} />
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}