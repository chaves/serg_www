<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-gray-100 to-serg_blue-50">
	<header class="py-2 md:py-3 bg-white/85 backdrop-blur-sm border-b border-gray-200/60 shadow-sm">
		<div class="container">
			<div class="grid grid-cols-[1fr_auto] gap-x-3 md:gap-x-5 gap-y-0.5 items-center">
				<div class="flex items-center justify-start">
					<a href="/" class="inline-flex items-center transition-transform duration-300 hover:scale-105">
						<img
							class="block h-16 md:h-20 drop-shadow-sm"
							src="/logo_100.png"
							alt="Sustainable Economy Research Group (S.E.R.G.)"
						/>
					</a>
				</div>
				<div class="row-span-2 flex items-center justify-end self-center">
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
				<div class="text-left">
					<p class="m-0 mb-0 text-xs md:text-sm lg:text-base font-semibold text-serg_blue-800 leading-tight">
					Sustainable Economy Research Group (SERG)
					</p>
					<p class="m-0 mt-0 text-[11px] md:text-xs lg:text-sm text-serg_gray-dark/95 leading-tight">
					CentraleSupélec / Paris-Saclay University · Industrial Engineering Department (LGI)
					</p>
				</div>
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
