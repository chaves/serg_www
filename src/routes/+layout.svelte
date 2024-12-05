<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-gray-100">
	<header class="py-4">
		<div class="container">
			<div class="grid grid-cols-2 items-center">
				<div class="flex justify-start">
					<a href="/">
						<img
							class="h-16"
							src="/logo_100.png"
							alt="Sustainable Economy Research Group (S.E.R.G.)"
						/></a
					>
				</div>
				<div class="flex justify-end">
					<a href="https://www.centralesupelec.fr/"
						><img
							class="h-16"
							src="/logo_centrale_150.png"
							alt="Sustainable Economy Research Group (S.E.R.G.)"
						/></a
					>
				</div>
			</div>

			<h1 class="text-left text-sm md:text-base lg:text-lg font-bold -mb-3 mt-2">
				Sustainable Economy Research Group (S.E.R.G.) at CentraleSupélec / Paris-Saclay University /
				Industrial Engineering Departement (LGI)
			</h1>
		</div>
	</header>

	<Navigation />

	<main class="container mx-auto px-4 py-4 flex-grow shadow-md my-4 rounded-lg bg-white">
		{@render children()}
	</main>

	<footer class="p-4 mt-3 mb-6">
		<div class="container mx-auto px-4 text-center">
			<p>
				&copy; {new Date().getFullYear()} Sustainable Economy Research Group (S.E.R.G.) at CentraleSupélec
				/ Paris-Saclay University / Industrial Engineering Departement (LGI). All rights reserved.
			</p>
		</div>
	</footer>
</div>
