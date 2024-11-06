<script lang="ts">
    import { page } from "$app/stores";
    import { Menu, X } from 'lucide-svelte';
    import { slide } from 'svelte/transition';
    import MenuItems from '$lib/components/MenuItems.svelte';


    let isMenuOpen = false;

    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }
  </script>

<nav class="bg-green-600 text-white">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <button class="md:hidden" on:click={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {#if isMenuOpen}
            <X size={24} />
          {:else}
            <Menu size={24} />
          {/if}
        </button>
        <MenuItems {toggleMenu} />
      </div>
    </div>
    {#if isMenuOpen}
      <div transition:slide={{ duration: 300 }} class="md:hidden">
        <MenuItems isMobile={true} {toggleMenu} />
      </div>
    {/if}
  </nav>