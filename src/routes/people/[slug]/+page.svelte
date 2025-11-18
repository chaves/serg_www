<script lang="ts">
	import type { PageData } from './$types';
	import PersonPage from './PersonPage.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';

	let { data }: { data: PageData } = $props();

	const title = data.person ? `${data.person.first_name} ${data.person.last_name}`: 'Member not found';
	const image = data.person?.picture?.formats?.medium?.url || data.person?.picture?.url;
	const imageUrl = image ? `https://cms.serg.paris${image}` : undefined;

</script>

{#if data.person}
	<SEO
		title={title}
		description={data.person.bio ? data.person.bio : `Member of SERG - ${data.person.category || 'Research Team'}`}
		image={imageUrl}
		type="profile"
	/>
	<StructuredData
		type="Person"
		data={{
			name: title,
			category: data.person.category,
			image: image,
			email: data.person.email,
			bio: data.person.bio
		}}
	/>
{/if}


{#if data.person}
	<PersonPage person={data.person} {title} />
{:else if data.error}
	<p>Error: {data.error}</p>
{:else}
	<p>Loading...</p>
{/if}