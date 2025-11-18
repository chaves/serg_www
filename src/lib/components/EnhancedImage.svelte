<script lang="ts">
	let {
		src,
		alt,
		width,
		height,
		class: className = '',
		lazy = true,
		priority = false
	}: {
		src: string;
		alt: string;
		width?: number;
		height?: number;
		class?: string;
		lazy?: boolean;
		priority?: boolean;
	} = $props();

	const loading = priority ? 'eager' : (lazy ? 'lazy' : 'eager');
	const fetchPriority = priority ? 'high' : 'auto';
</script>

<img
	{src}
	{alt}
	{width}
	{height}
	loading={loading}
	fetchpriority={fetchPriority}
	decoding="async"
	class={className}
	onerror={(e) => {
		const target = e.currentTarget as HTMLImageElement;
		target.style.display = 'none';
	}}
/>

