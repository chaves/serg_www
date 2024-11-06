<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	let { children } = $props();

	let interLoaded = false;
	let robotoLoaded = false;

	onMount(() => {
		if (browser) {
			const interFont = new FontFace(
				'Inter',
				'url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_0ew.woff2) format("woff2")',
				{
					style: 'normal',
					weight: '700',
					display: 'swap'
				}
			);

			const robotoFont = new FontFace(
				'Roboto',
				'url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format("woff2")',
				{
					style: 'normal',
					weight: '400',
					display: 'swap'
				}
			);

			Promise.all([interFont.load(), robotoFont.load()]).then((fonts) => {
				fonts.forEach((font) => document.fonts.add(font));
				interLoaded = true;
				robotoLoaded = true;
			});
		}
	});
</script>

<div class="min-h-screen flex flex-col bg-gray-100">
	<header class="bg-green-700 text-white py-4">
		<div class="container mx-auto px-4">
			<h1 class="text-xl md:text-2xl font-bold text-left">Sustainable Economy Research Group (SERG)</h1>
		</div>
	</header>

	<Navigation />

	<main class="container mx-auto px-4 py-4 flex-grow bg-white shadow-md my-4 rounded-lg">
		{@render children()}
	</main>

	<footer class="bg-green-700 text-white p-4 mt-8">
		<div class="container mx-auto px-4 text-center">
			<p>
				&copy; {new Date().getFullYear()} Sustainable Economy Research Group (SERG). All rights reserved.
			</p>
		</div>
	</footer>
</div>
