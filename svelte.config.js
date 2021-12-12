import path from 'path';
import { cwd } from 'process';

import preprocess from 'svelte-preprocess';
import Icons from 'unplugin-icons/vite';
import adapterStatic from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';
const repositoryName = path.basename(cwd());
const base = dev ? '' : `/${repositoryName}`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    paths: { base },
    target: 'body',
    adapter: adapterStatic(),
    vite: {
      define: {
        'vite.define.basePath': JSON.stringify(base),
      },
      plugins: [
        Icons({
          compiler: 'svelte',
        }),
      ],
    },
  },
};

export default config;
