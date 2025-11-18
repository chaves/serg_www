<script lang="ts">
	import type { PageData } from './$types';
	import logo_hal from '$lib/assets/images/HAL_logotype-rvb_fond-clair_fr.png?enhanced&w=400;200';
	import SEO from '$lib/components/SEO.svelte';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title="Publications"
	description="Research publications from the Sustainable Economy Research Group (SERG) at CentraleSupélec, available through HAL archives ouvertes."
/>

<h1>Publications</h1>

<a
	href="https://centralesupelec.hal.science/LGI"
	aria-label="Visit CentraleSupélec HAL Science repository"
>
	<enhanced:img
		src={logo_hal}
		alt="HAL archives ouvertes"
		sizes="(min-width:1080px) 400px, (min-width:768px) 200px"
		class="mx-auto -my-9"
	/>
</a>

<div class="space-y-2">
	{#if data.halContent}
		<div class="hal-content">
			{@html data.halContent}
		</div>
		{#if data.cached}
			<p class="text-sm text-gray-500 italic text-center mt-4">
				Content cached - Last updated: {new Date(
					data.cacheTimestamp || Date.now()
				).toLocaleString()}
			</p>
		{/if}
	{:else if data.error}
		<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
			<p class="text-yellow-800">{data.error}</p>
			<p class="text-sm text-yellow-600 mt-2">
				Please try refreshing the page or visit{' '}
				<a
					href="https://centralesupelec.hal.science/LGI"
					class="underline hover:no-underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					HAL directly
				</a>
				.
			</p>
		</div>
	{:else}
		<div class="text-center py-8">
			<p>Loading publications...</p>
		</div>
	{/if}
</div>

<style>
	.hal-content {
		@apply w-full;
		@apply pt-2 pb-6;
	}

	/* Year headings */
	.hal-content :global(.Rubrique) {
		@apply text-2xl md:text-3xl font-bold text-serg_blue-600 mt-4 mb-4 pb-2 border-b-2 border-serg_blue-300;
	}

	/* Document type subheadings */
	.hal-content :global(.SousRubrique) {
		@apply text-xl md:text-2xl font-semibold text-serg_blue-500 mt-6 mb-3;
	}

	/* Publication notice container */
	.hal-content :global(.NoticeRes) {
		@apply bg-white p-4 md:p-6 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow;
		@apply border-l-4 border-serg_blue-400;
	}

	/* Field labels (dt elements) */
	.hal-content :global(.ChampRes) {
		@apply font-semibold text-gray-700;
		@apply text-sm md:text-base;
		@apply float-left clear-left;
		@apply min-w-[120px] md:min-w-[150px];
		@apply align-top;
		padding-top: 0.75rem;
		margin: 0;
		vertical-align: top;
	}

	/* First label in each publication */
	.hal-content :global(dl.NoticeRes > dt.ChampRes:first-of-type) {
		padding-top: 0;
	}

	/* Field values (dd elements) */
	.hal-content :global(.ValeurRes) {
		@apply text-gray-800;
		@apply leading-relaxed;
		@apply ml-0;
		@apply pl-[120px] md:pl-[150px];
		@apply align-top;
		padding-top: 0.75rem;
		margin: 0 0 0.5rem 0;
		vertical-align: top;
	}

	/* First value in each publication */
	.hal-content :global(dl.NoticeRes > dd.ValeurRes:first-of-type) {
		padding-top: 0;
	}

	/* Title styling */
	.hal-content :global(.Titre) {
		@apply text-lg md:text-xl font-semibold text-serg_blue-600 mb-2;
	}

	.hal-content :global(.Titre a) {
		@apply text-serg_blue-600 hover:text-serg_blue-700;
		@apply no-underline hover:underline;
		@apply transition-colors;
	}

	/* Authors styling */
	.hal-content :global(.Auteurs) {
		@apply text-base text-gray-700 italic;
	}

	/* Article/Journal info */
	.hal-content :global(.article) {
		@apply text-sm md:text-base text-gray-600;
	}

	.hal-content :global(.article i) {
		@apply font-semibold text-gray-800;
	}

	/* Links */
	.hal-content :global(a) {
		@apply text-serg_blue-500;
		@apply hover:text-serg_blue-600;
		@apply transition-colors;
	}

	.hal-content :global(a[target='_blank']) {
		@apply underline hover:no-underline;
	}

	/* BibTeX and PDF icons */
	.hal-content :global(.LienBibtex),
	.hal-content :global(.Fichier_joint) {
		@apply block;
		@apply mt-2;
		@apply ml-0;
	}

	.hal-content :global(.LienBibtex img),
	.hal-content :global(.Fichier_joint img) {
		@apply inline-block;
		@apply transition-transform duration-200;
		@apply hover:scale-110;
	}

	.hal-content :global(.LienBibtexACoteFulltext) {
		@apply inline-block;
		@apply ml-2;
		vertical-align: middle;
	}

	/* Year and document type containers */
	.hal-content :global(.annee_publi) {
		@apply mb-8;
	}

	.hal-content :global(.typdoc) {
		@apply mb-6;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.hal-content :global(.NoticeRes) {
			@apply p-3;
		}

		.hal-content :global(.ChampRes) {
			@apply min-w-[100px];
			padding-top: 0.5rem;
		}

		.hal-content :global(.ValeurRes) {
			@apply pl-[100px];
			padding-top: 0.5rem;
		}

		.hal-content :global(dl.NoticeRes > dt.ChampRes:first-of-type),
		.hal-content :global(dl.NoticeRes > dd.ValeurRes:first-of-type) {
			padding-top: 0;
		}
	}

	/* Ensure proper spacing and layout for definition lists */
	.hal-content :global(dl.NoticeRes) {
		@apply mb-0;
		@apply clear-both;
	}
</style>
