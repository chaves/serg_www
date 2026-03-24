<script lang="ts">
	import type { PageData } from './$types';
	import SEO from '$lib/components/SEO.svelte';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title="CEMSI - Chaire Energy Markets and Sustainable Industries"
	description="Energy Markets and Sustainable Industries (CEMSI) Chair at SERG - Research on sustainable energy transitions and industrial decarbonization."
/>

<div class="max-w-4xl mx-auto px-4 py-8">
	{#if data.cemsi}
		<!-- Title Section -->
		<h1 class="cemsi-title text-4xl md:text-5xl font-bold text-center mb-6 text-serg_blue-800">
			{data.cemsi.title}
		</h1>

		<!-- Logo Section -->
		<div class="flex justify-center mb-8">
			<img
				src="/logoCEMSI.jpg"
				alt="CEMSI Logo - Chaire Energy Markets and Sustainable Industries"
				class="w-full max-w-md h-auto rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
			/>
		</div>

		<!-- Content Section -->
		<div class="prose prose-lg max-w-none">
			<div
				class="content-container bg-white rounded-xl shadow-md p-8 border border-serg_blue-100"
			>
				{@html data.cemsi.content}
			</div>
		</div>
	{:else}
		<div class="text-center py-12">
			<p class="text-gray-600 text-lg">CEMSI content unavailable.</p>
		</div>
	{/if}
</div>

<style>
	.cemsi-title {
		line-height: 1.14;
	}

	@media (min-width: 768px) {
		.cemsi-title {
			line-height: 1.1;
		}
	}

	:global(.content-container p) {
		margin-bottom: 1rem;
		line-height: 1.75;
		color: #374151;
	}

	:global(.content-container h2) {
		font-size: 1.875rem;
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: #001e47;
	}

	:global(.content-container h3) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		color: #003366;
	}

	:global(.content-container ul) {
		margin-left: 1.5rem;
		margin-bottom: 1rem;
		list-style-type: disc;
	}

	:global(.content-container ol) {
		margin-left: 1.5rem;
		margin-bottom: 1rem;
		list-style-type: decimal;
	}

	:global(.content-container li) {
		margin-bottom: 0.5rem;
		line-height: 1.75;
	}

	:global(.content-container strong) {
		font-weight: 600;
		color: #1f2937;
	}

	:global(.content-container em) {
		font-style: italic;
	}

	:global(.content-container a) {
		color: #003366;
		text-decoration: underline;
		transition: color 0.2s;
	}

	:global(.content-container a:hover) {
		color: #002652;
	}
</style>
