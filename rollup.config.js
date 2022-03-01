/** @format */

import svelte from 'rollup-plugin-svelte';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'index.ts',
	output: [
		{
			file: './dist/index.mjs',
			format: 'esm',
			sourcemap: true,
		},
		{
			file: './dist/index.js',
			format: 'cjs',
			name: 'Name',
			sourcemap: true,
		},
	],
	external: ['svelte/store', 'svelte'],
	plugins: [typescript(), svelte()],
};
