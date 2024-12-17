<script>
    import { getFirstTwoSentences } from '$lib/utils';

    export let text = "";
    export let slug = "";
    export let path = "";

  </script>

    {#if text}
        {@html getFirstTwoSentences(text).join(" ")} (<a class="font-semibold italic" href={`/${path}/${slug}`}>read more ...</a>)
    {/if}