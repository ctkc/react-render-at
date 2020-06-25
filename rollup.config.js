import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDependencies from 'rollup-plugin-peer-deps-external';

import packageJSON from './package.json';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: packageJSON.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: false,
      },
      {
        file: packageJSON.module,
        format: 'es',
        exports: 'named',
        sourcemap: false,
      },
    ],
    plugins: [
      peerDependencies(),
      typescript(),
      resolve(),
      commonjs({
        include: ['node_modules/**'],
      }),
    ],
  },
];
