/** @format */

import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "./src/index.js",
  output: [
    {
      file: "./dist/index.mjs",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "./dist/index.js",
      format: "umd",
      name: "Name",
      sourcemap: true,
    },
  ],
  plugins: [svelte(), resolve()],
};
