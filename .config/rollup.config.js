/** @format */

import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import pkg from '../package.json' assert { type: 'json' };

const bundle = (config) => ({
    input: './src/index.ts',
    external: ['svelte/store', 'svelte'],
    ...config,
});

export default [
    bundle({
        plugins: [commonjs(), svelte(), resolve(), esbuild(), cleanup({ extensions: ['ts'] })],
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true,
            },
        ],
    }),
    bundle({
        output: {
            file: pkg.types,
            format: 'es',
        },
        plugins: [resolve(), svelte(), commonjs(), cleanup({ extensions: ['.ts'] }), dts()],
    }),
];
