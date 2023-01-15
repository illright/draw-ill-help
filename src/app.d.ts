// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

/// <reference types="unplugin-icons/types/svelte" />

declare namespace viteDefine {
	interface Vite {
		define: Define;
	}

	interface Define {
		basePath: string;
	}
}

declare const vite: viteDefine.Vite;

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
