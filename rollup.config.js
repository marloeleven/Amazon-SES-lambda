import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js',
  output: {
    dir: 'bundle',
    format: 'cjs',
  },
  plugins: [resolve(), json(), commonjs()],
};
