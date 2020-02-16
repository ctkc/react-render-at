import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDependencies from 'rollup-plugin-peer-deps-external'
import { uglify } from 'rollup-plugin-uglify'

import packageJSON from './package.json'

const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, '.min.js')

export default [
  {
    input: './src/index.js',
    output: {
      file: packageJSON.main,
      format: 'cjs',
      exports: 'named'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      peerDependencies(),
      resolve(),
      commonjs({
        include: [
          'node_modules/**'
        ],
        namedExports: {
          'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
          'node_modules/react-dom/index.js': ['render']
        }
      })
    ]
  },
  // Minified version
  {
    input: './src/index.js',
    output: {
      file: minifyExtension(packageJSON.main),
      format: 'cjs',
      exports: 'named'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      peerDependencies(),
      resolve(),
      commonjs({
        include: [
          'node_modules/**'
        ],
        namedExports: {
          'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
          'node_modules/react-dom/index.js': ['render']
        }
      }),
      uglify()
    ]
  }
]
