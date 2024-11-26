<!-- src/components/PersonCard.svelte -->
<script lang="ts">
	import type { Person } from '$types/people';

	export let person: Person;
</script>
{#if person.email}
<p class="text-center">
  <a href={`mailto:${person.email}`}>{person.email}</a>
</p>
{/if}

{#if person.picture}
<a href={`/people/${person.slug}`} class="image-link">
  <img
    src="https://cms.serg.paris{person.picture.data.url}"
    alt="An alt text"
    class="w-32 h-32 rounded-full object-cover md:mr-10 float-right"
  />
</a>
{/if}

{@html person?.bio}

<style>

</style>
