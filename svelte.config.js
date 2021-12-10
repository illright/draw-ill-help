import preprocess from 'svelte-preprocess';
import Icons from 'unplugin-icons/vite';
import adapterStatic from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		target: 'body',
		adapter: adapterStatic(),
		vite: {
			plugins: [
				Icons({
					compiler: 'svelte'
				})
			]
		}
	}
};

export default config;
