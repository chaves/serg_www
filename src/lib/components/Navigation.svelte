<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { slide, fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import MenuItems from '$lib/components/MenuItems.svelte';
	import { onMount } from 'svelte';

	let isMenuOpen = $state(false);
	let menuElement: HTMLElement;
	let previousPathname = $page.url.pathname;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMenu() {
		if (isMenuOpen) {
			isMenuOpen = false;
			document.body.style.overflow = '';
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		// Close menu when clicking on the backdrop (not on menu content)
		if (event.target === event.currentTarget) {
			closeMenu();
		}
	}

	function handleEscape(event: KeyboardEvent) {
		if (event.key === 'Escape' && isMenuOpen) {
			closeMenu();
		}
	}

	// Close menu when route changes
	$effect(() => {
		const currentPathname = $page.url.pathname;
		if (currentPathname !== previousPathname && isMenuOpen) {
			closeMenu();
		}
		previousPathname = currentPathname;
	});

	onMount(() => {
		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = '';
		};
	});
</script>

<nav
	class="bg-gradient-to-r from-serg_purple via-serg_purple to-serg_blue-800 text-white sticky top-0 z-50 shadow-lg backdrop-blur-sm"
	bind:this={menuElement}
>
	<div class="container mx-auto px-4 md:px-8">
		<div class="flex justify-between items-center py-3 md:py-4">
			<button
				class="md:hidden p-2 rounded-md transition-colors duration-200 hover:bg-white/10 active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
				onclick={toggleMenu}
				aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={isMenuOpen}
			>
				{#if isMenuOpen}
					<X size={28} />
				{:else}
					<Menu size={28} />
				{/if}
			</button>
			<MenuItems {toggleMenu} />
		</div>
	</div>
	{#if isMenuOpen}
		<div
			transition:fade={{ duration: 200 }}
			class="fixed inset-0 bg-black/50 z-40 md:hidden"
			onclick={handleBackdropClick}
			role="presentation"
		></div>
		<div
			transition:slide={{ duration: 300, axis: 'y' }}
			class="md:hidden bg-serg_purple border-t border-white/10 shadow-lg relative z-50"
		>
			<MenuItems isMobile={true} {toggleMenu} />
		</div>
	{/if}
</nav>
