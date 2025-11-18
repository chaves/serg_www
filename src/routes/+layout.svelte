<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-gray-100 to-serg_blue-50">
	<header class="py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
		<div class="container">
			<div class="grid grid-cols-2 items-center gap-4">
				<div class="flex justify-start">
					<a href="/" class="transition-transform duration-300 hover:scale-105">
						<img
							class="h-14 md:h-16 drop-shadow-sm"
							src="/logo_100.png"
							alt="Sustainable Economy Research Group (S.E.R.G.)"
						/>
					</a>
				</div>
				<div class="flex justify-end">
					<a
						href="https://www.centralesupelec.fr/"
						class="transition-transform duration-300 hover:scale-105"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							class="h-12 md:h-16 drop-shadow-sm"
							src="/logo_centrale_univ_150.png"
							alt="CentraleSupélec / Paris-Saclay University"
						/>
					</a>
				</div>
			</div>

			<h1
				class="text-left text-sm md:text-base lg:text-lg font-bold -mb-3 mt-3 text-serg_blue-700 tracking-tight"
			>
				Sustainable Economy Research Group (S.E.R.G.) at CentraleSupélec / Paris-Saclay University<br
				/>
				<span class="text-serg_gray-dark">Industrial Engineering Departement (LGI)</span>
			</h1>
		</div>
	</header>

	<Navigation />

	<main
		class="container mx-auto px-4 md:px-8 py-4 md:py-8 flex-grow shadow-lg my-4 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200/50"
	>
		{@render children()}
	</main>

	<footer
		class="p-6 mt-6 mb-6 bg-gradient-to-r from-serg_blue-900 via-serg_blue-800 to-serg_purple text-white rounded-t-2xl shadow-lg"
	>
		<div class="container mx-auto px-4 text-center">
			<p class="text-sm md:text-base opacity-90">
				&copy; {new Date().getFullYear()} Sustainable Economy Research Group (S.E.R.G.) at CentraleSupélec
				/ Paris-Saclay University / Industrial Engineering Departement (LGI). All rights reserved.
			</p>
		</div>
	</footer>
</div>
