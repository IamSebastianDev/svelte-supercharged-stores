/** @format */

import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: './dist/index.mjs',
			format: 'esm',
			sourcemap: true,
		},
		{
			file: './dist/index.js',
			format: 'umd',
			name: 'Name',
			sourcemap: true,
		},
	],
	plugins: [typescript(), svelte(), resolve()],
};
