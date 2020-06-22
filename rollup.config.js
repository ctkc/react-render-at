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
      },
      {
        file: packageJSON.module,
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      peerDependencies(),
      typescript(),
      resolve(),
      commonjs({
        include: ['node_modules/**'],
        namedExports: {
          'node_modules/react/index.js': [
            'Children',
            'Component',
            'PropTypes',
            'createElement',
          ],
          'node_modules/react-dom/index.js': ['render'],
        },
      }),
    ],
  },
];
