/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

// TODO: figure out how to prevent a false positive here
/* eslint-disable no-unused-vars */
declare namespace viteDefine {
  interface Vite {
    define: Define;
  }

  interface Define {
    basePath: string;
  }
}

declare const vite: viteDefine.Vite;
