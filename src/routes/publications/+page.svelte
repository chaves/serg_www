<script lang="ts">
	import type { PageData } from './$types';
	import type { Publication } from './+page.server';
	import logo_hal from '$lib/assets/images/HAL_logotype-rvb_fond-clair_fr.png';
	import SEO from '$lib/components/SEO.svelte';
	import { invalidateAll } from '$app/navigation';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	// Track selected document type filter (null = show all)
	let selectedType = $state<string | null>(null);

	// Refresh state
	let isRefreshing = $state(false);

	async function refreshPublications() {
		isRefreshing = true;
		try {
			// Navigate with refresh param to bypass cache
			await goto('/publications?refresh=1', { invalidateAll: true });
		} finally {
			isRefreshing = false;
			// Clean URL after refresh
			history.replaceState(null, '', '/publications');
		}
	}

	// Format cache timestamp
	function formatCacheTime(timestamp: number | undefined): string {
		if (!timestamp) return '';
		const date = new Date(timestamp);
		return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
	}

	// Compute available document types with counts
	const documentTypes = $derived(() => {
		if (!data.publications) return [];

		const typeCounts = new Map<string, { label: string; count: number }>();

		for (const yearGroup of data.publications) {
			for (const typeGroup of yearGroup.byType) {
				const existing = typeCounts.get(typeGroup.type);
				if (existing) {
					existing.count += typeGroup.publications.length;
				} else {
					typeCounts.set(typeGroup.type, {
						label: typeGroup.typeLabel,
						count: typeGroup.publications.length
					});
				}
			}
		}

		return Array.from(typeCounts.entries()).map(([type, { label, count }]) => ({
			type,
			label,
			count
		}));
	});

	// Filter publications based on selected type
	const filteredPublications = $derived(() => {
		if (!data.publications) return [];
		if (!selectedType) return data.publications;

		return data.publications
			.map((yearGroup) => ({
				year: yearGroup.year,
				byType: yearGroup.byType.filter((typeGroup) => typeGroup.type === selectedType)
			}))
			.filter((yearGroup) => yearGroup.byType.length > 0);
	});

	// Filtered count
	const filteredCount = $derived(() => {
		if (!selectedType) return data.totalCount;
		return documentTypes().find((t) => t.type === selectedType)?.count || 0;
	});

	function selectType(type: string | null) {
		selectedType = type;
		// Scroll to top of publications
		document.getElementById('publications-list')?.scrollIntoView({ behavior: 'smooth' });
	}
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
	<img
		src={logo_hal}
		alt="HAL archives ouvertes"
		class="mx-auto -my-9"
		width="400"
		height="117"
		loading="lazy"
		decoding="async"
	/>
</a>

<div class="space-y-2">
	{#if data.publications && data.publications.length > 0}
		<!-- Document Type Navigation -->
		<nav class="type-nav" aria-label="Filter by document type">
			<div class="type-nav-header">
				<h2>Filter by Type</h2>
				<span class="pub-count">{filteredCount()} publications</span>
			</div>
			<div class="type-nav-buttons">
				<button
					class="type-btn"
					class:active={selectedType === null}
					onclick={() => selectType(null)}
				>
					<span class="type-btn-label">All</span>
					<span class="type-btn-count">{data.totalCount}</span>
				</button>
				{#each documentTypes() as docType}
					<button
						class="type-btn"
						class:active={selectedType === docType.type}
						onclick={() => selectType(docType.type)}
					>
						<span class="type-btn-label">{docType.label}</span>
						<span class="type-btn-count">{docType.count}</span>
					</button>
				{/each}
			</div>
		</nav>

		<div id="publications-list" class="publications-content">
			{#each filteredPublications() as yearGroup}
				<div class="year-section">
					<h2 class="year-heading">{yearGroup.year}</h2>

					{#each yearGroup.byType as typeGroup}
						<div class="type-section">
							<h3 class="type-heading">
								<span class="type-badge">
									{typeGroup.typeLabel}
								</span>
							</h3>

							{#each typeGroup.publications as pub}
								<article class="publication-card">
									<h4 class="pub-title">
										<a href={pub.url} target="_blank" rel="noopener noreferrer">
											{pub.title}
										</a>
									</h4>

									<p class="pub-authors">
										{pub.authors.join(', ')}
									</p>

									{#if pub.journal}
										<p class="pub-venue">
											<span class="venue-label">Journal:</span>
											<em>{pub.journal}</em>
										</p>
									{/if}

									{#if pub.conference}
										<p class="pub-venue">
											<span class="venue-label">Conference:</span>
											<em>{pub.conference}</em>
										</p>
									{/if}

									{#if pub.book}
										<p class="pub-venue">
											<span class="venue-label">Book:</span>
											<em>{pub.book}</em>
										</p>
									{/if}

									<div class="pub-links">
										{#if pub.doi}
											<a
												href="https://doi.org/{pub.doi}"
												target="_blank"
												rel="noopener noreferrer"
												class="pub-link"
											>
												DOI
											</a>
										{/if}
										{#if pub.pdfUrl}
											<a
												href={pub.pdfUrl}
												target="_blank"
												rel="noopener noreferrer"
												class="pub-link pdf-link"
											>
												PDF
											</a>
										{/if}
										<a href={pub.url} target="_blank" rel="noopener noreferrer" class="pub-link">
											HAL
										</a>
									</div>
								</article>
							{/each}
						</div>
					{/each}
				</div>
			{/each}
		</div>

		<!-- Cache info and refresh button -->
		<div class="cache-info">
				<div class="cache-status">
					{#if data.cached}
						<span class="cache-text">
							Cached at {formatCacheTime(data.cacheTimestamp)}
						</span>
					{:else}
						<span class="cache-text fresh">Data is up to date</span>
					{/if}
				</div>
				<button
					class="refresh-btn"
					onclick={refreshPublications}
					disabled={isRefreshing}
					aria-label="Refresh publications"
				>
				<svg
					class="refresh-icon"
					class:spinning={isRefreshing}
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
					<path d="M3 3v5h5" />
					<path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
					<path d="M16 16h5v5" />
				</svg>
					{isRefreshing ? 'Loading...' : 'Refresh'}
				</button>
			</div>
		{:else if data.error}
			<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
				<p class="text-yellow-800">{data.error}</p>
				<p class="text-sm text-yellow-600 mt-2">
					Please refresh this page or visit
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
	/* Document Type Navigation */
	.type-nav {
		@apply bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8;
		@apply border border-gray-100;
	}

	.type-nav-header {
		@apply flex flex-wrap items-center justify-between gap-2 mb-4;
	}

	.type-nav-header h2 {
		@apply text-lg font-semibold text-gray-800 m-0;
	}

	.pub-count {
		@apply text-sm text-gray-500 font-medium;
	}

	.type-nav-buttons {
		@apply flex flex-wrap gap-2;
	}

	.type-btn {
		@apply flex items-center gap-2 px-4 py-2 rounded-lg;
		@apply bg-gray-50 border border-gray-200;
		@apply text-gray-700 font-medium;
		@apply hover:bg-serg_blue-50 hover:border-serg_blue-200 hover:text-serg_blue-700;
		@apply transition-all duration-200;
		@apply cursor-pointer;
	}

	.type-btn.active {
		@apply bg-serg_blue-600 border-serg_blue-600 text-white;
		@apply shadow-md;
	}

	.type-btn.active:hover {
		@apply bg-serg_blue-700 border-serg_blue-700;
	}

	.type-btn-label {
		@apply text-sm md:text-base;
	}

	.type-btn-count {
		@apply text-xs px-2 py-0.5 rounded-full;
		@apply bg-gray-200 text-gray-600;
	}

	.type-btn.active .type-btn-count {
		@apply bg-serg_blue-500 text-white;
	}

	/* Publications content */
	.publications-content {
		@apply w-full pt-2 pb-6;
	}

	/* Year sections */
	.year-section {
		@apply mb-10;
	}

	.year-heading {
		@apply text-2xl md:text-3xl font-bold text-serg_blue-600 mt-4 mb-4 pb-2 border-b-2 border-serg_blue-300;
	}

	/* Document type sections */
	.type-section {
		@apply mb-8;
	}

	.type-heading {
		@apply text-xl md:text-2xl font-semibold mt-6 mb-4;
		@apply flex items-center gap-3;
	}

	.type-badge {
		@apply inline-flex items-center px-4 py-2 rounded-lg;
		@apply bg-gradient-to-r from-serg_blue-500 to-serg_blue-600;
		@apply text-white shadow-sm;
	}

	/* Publication cards */
	.publication-card {
		@apply bg-white p-4 md:p-6 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow;
		@apply border-l-4 border-serg_blue-400;
	}

	.pub-title {
		@apply text-lg md:text-xl font-semibold text-serg_blue-600 mb-2;
	}

	.pub-title a {
		@apply text-serg_blue-600 hover:text-serg_blue-700;
		@apply no-underline hover:underline;
		@apply transition-colors;
	}

	.pub-authors {
		@apply text-base text-gray-700 italic mb-2;
	}

	.pub-venue {
		@apply text-sm md:text-base text-gray-600 mb-1;
	}

	.venue-label {
		@apply font-semibold text-gray-700 mr-1;
	}

	.pub-links {
		@apply flex flex-wrap gap-2 mt-3;
	}

	.pub-link {
		@apply inline-block px-3 py-1 text-sm rounded-full;
		@apply bg-serg_blue-100 text-serg_blue-700;
		@apply hover:bg-serg_blue-200 transition-colors;
		@apply no-underline;
	}

	.pdf-link {
		@apply bg-green-100 text-green-700 hover:bg-green-200;
	}

	/* Cache info and refresh button */
	.cache-info {
		@apply flex flex-wrap items-center justify-center gap-4 mt-8 pt-6;
		@apply border-t border-gray-200;
	}

	.cache-status {
		@apply text-sm text-gray-500;
	}

	.cache-text {
		@apply italic;
	}

	.cache-text.fresh {
		@apply text-green-600 font-medium not-italic;
	}

	.refresh-btn {
		@apply inline-flex items-center gap-2 px-4 py-2 rounded-lg;
		@apply bg-serg_blue-50 text-serg_blue-700 border border-serg_blue-200;
		@apply hover:bg-serg_blue-100 hover:border-serg_blue-300;
		@apply transition-all duration-200;
		@apply cursor-pointer font-medium text-sm;
	}

	.refresh-btn:disabled {
		@apply opacity-60 cursor-wait;
	}

	.refresh-icon {
		@apply transition-transform duration-200;
	}

	.refresh-icon.spinning {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.publication-card {
			@apply p-3;
		}

		.type-btn {
			@apply px-3 py-1.5;
		}

		.type-btn-label {
			@apply text-xs;
		}

		.type-btn-count {
			@apply text-xs px-1.5;
		}
	}
</style>
