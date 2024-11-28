<script>
    import { getFirstTwoSentences } from '$lib/utils';

    export let text = "";
    export let slug = "";

  </script>

    {#if text}
        {@html getFirstTwoSentences(text).join(" ")} (<a class="font-semibold italic" href={`/news/${slug}`}>read more ...</a>)
    {/if}