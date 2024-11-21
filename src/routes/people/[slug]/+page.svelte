<script lang="ts">
	import type { Person } from '$types/people';
	import PersonPage from './PersonPage.svelte';

	export let data: {
		person: Person | null;
		error?: string;
	};

	const title = data.person ? `${data.person.attributes.first_name} ${data.person.attributes.last_name}`: 'Member not found';

</script>

<h1>
	{title}
</h1>

{#if data.person}
	<PersonPage person={data.person.attributes} />
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}