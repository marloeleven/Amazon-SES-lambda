import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

dotenv.config();

export default {
  input: 'src/index.js',
  output: {
    dir: 'bundle',
    format: 'cjs',
  },
  plugins: [
    replace({
      values: {
        'process.env.SECRET_KEY': JSON.stringify(process.env.SECRET_KEY || ''),
        'process.env.CHUNK_SIZE': JSON.stringify(process.env.CHUNK_SIZE || 0),
        'process.env.ORIGIN_EMAIL': JSON.stringify(process.env.ORIGIN_EMAIL || ''),
      },
      preventAssignment: true,
    }),
    resolve(),
    json(),
    commonjs(),
  ],
};
