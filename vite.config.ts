import path from 'path';
import { cwd } from 'process';

import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

const dev = process.env.NODE_ENV === 'development';
const repositoryName = path.basename(cwd());
const base = dev ? '' : `/${repositoryName}`;

const config: UserConfig = {
	define: {
		'vite.define.basePath': JSON.stringify(base),
	},
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
		}),
	],
};

export default config;
