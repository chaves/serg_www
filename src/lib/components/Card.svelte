<script lang="ts">
	export let title: string;
	export let slug: string;
	export let path: string;
</script>

<article>
	<div class="content">
		<div class="picture_mobile">
			<slot name="picture" />
		</div>

		<slot name="header" />

		<h3 class="text-xl font-semibold mb-2">
			<a href="/{path}/{slug}">{title}</a>
		</h3>

		<div class="description">
			<slot name="description" />
		</div>

		<slot name="tags" />

		<slot name="footer" />
	</div>
	<div class="picture">
		<slot name="picture" />
	</div>
</article>

<style>
	article {
		@apply flex items-center justify-between bg-white p-4 rounded shadow hover:shadow-md transition-shadow;
	}

	.content {
		@apply text-lg flex-1;
	}

	.picture {
		@apply ml-4 hidden md:block;
	}

	.picture_mobile {
		@apply md:hidden mb-2;
	}

	.description {
		@apply text-sm italic;
	}
</style>
