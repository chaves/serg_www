<!-- src/components/NewCard.svelte -->
<script lang="ts">
    import type { Event } from '$types/events';
    import { formatDate } from '$lib/utils';

    import AreasTags from '$lib/components/AreasTags.svelte';

    export let event: Event;
  </script>

  <article class="bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
    <h3 class="text-xl font-semibold mb-2">
      <a href="/news/{event.attributes.slug}">{event.attributes.title}</a>
    </h3>
    <p class="text-sm text-gray-600 mb-2">{formatDate(event.attributes.publishedAt)}</p>
    <AreasTags areas={event.attributes.areas} />
  </article>