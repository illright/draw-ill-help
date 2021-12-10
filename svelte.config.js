import path from 'path';
import { cwd } from 'process';

import preprocess from 'svelte-preprocess';
import Icons from 'unplugin-icons/vite';
import adapterStatic from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    paths: {
      base: dev ? '' : `/${path.basename(cwd())}`,
    },
    target: 'body',
    adapter: adapterStatic(),
    vite: {
      plugins: [
        Icons({
          compiler: 'svelte',
        }),
      ],
    },
  },
};

export default config;
