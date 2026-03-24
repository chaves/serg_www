<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-gray-100 to-serg_blue-50">
	<header class="py-7 md:py-8 bg-white/85 backdrop-blur-sm border-b border-gray-200/60 shadow-sm">
		<div class="container">
			<div class="flex items-center justify-between gap-x-3 md:gap-x-5">
				<a href="/" class="inline-flex items-center transition-transform duration-300 hover:scale-105">
					<img
						class="block h-12 md:h-16 drop-shadow-sm"
						src="/logo.svg"
						alt="Sustainable Economy Research Group (S.E.R.G.)"
					/>
				</a>
				<div class="flex items-center justify-end">
					<a
						href="https://www.centralesupelec.fr/"
						class="inline-flex items-center transition-transform duration-300 hover:scale-105"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							class="block h-10 md:h-12 drop-shadow-sm"
							src="/logo_centrale_univ_150.png"
							alt="CentraleSupélec / Paris-Saclay University"
						/>
					</a>
				</div>
			</div>
	</header>

	<Navigation />

	<main
		class="container mx-auto px-4 md:px-8 py-4 md:py-8 flex-grow shadow-md my-5 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200/60"
	>
		{@render children()}
	</main>

	<footer
		class="p-6 mt-6 mb-6 bg-gradient-to-r from-serg_blue-900 via-serg_blue-800 to-serg_purple text-white rounded-t-2xl shadow-lg"
	>
		<div class="container mx-auto px-4 text-center">
			<p class="text-sm md:text-base opacity-90">
				&copy; {new Date().getFullYear()} Sustainable Economy Research Group (SERG) at CentraleSupélec /
				Paris-Saclay University / Industrial Engineering Department (LGI). All rights reserved.
			</p>
		</div>
	</footer>
</div>
