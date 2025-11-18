<script lang="ts">
    import { getFirstTwoSentences } from '$lib/utils';

    let { text = "", slug = "", path = "" }: { text?: string; slug?: string; path?: string } = $props();

  </script>

    {#if text}
        {@html getFirstTwoSentences(text).join(" ")} (<a class="font-semibold italic" href={`/${path}/${slug}`}>read more ...</a>)
    {/if}