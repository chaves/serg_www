/// <reference types="@sveltejs/enhanced-img/types" />

// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Type declarations for enhanced image imports with additional query parameters
// The @sveltejs/enhanced-img package provides '*?enhanced' but we need to cover
// imports with additional query parameters like '?enhanced&w=1200;800'

// Match any file with enhanced and additional query parameters
declare module '*?enhanced&w=*' {
	import type { Picture } from 'vite-imagetools';
	const value: Picture;
	export default value;
}

// More general fallback for any enhanced image with query params
declare module '*?enhanced*' {
	import type { Picture } from 'vite-imagetools';
	const value: Picture;
	export default value;
}

export {};
