/** @format */

import svelte from 'rollup-plugin-svelte';
import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';

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
	plugins: [typescript(), svelte(), cleanup({ extensions: ['js', 'ts'] })],
};
