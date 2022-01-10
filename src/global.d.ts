/// <reference types="@sveltejs/kit" />
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
