import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve'
import { uglify } from 'rollup-plugin-uglify';
let isProd = process.env.NODE_ENV === 'production'

module.exports = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/xm-waveform.js',
      format: 'umd',
      sourcemap: true,
      name: 'XmWaveform'
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
        // plugins: ['external-helpers', 'transform-runtime'],
        // runtimeHelpers: true
        plugins: ['external-helpers'],
      }),
      commonjs(),
      !isProd && serve('./')
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/xm-waveform.min.js',
      format: 'umd',
      name: 'XmWaveform'
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
        plugins: ['external-helpers'],
      }),
      commonjs(),
      uglify()
    ]
  }
]

!isProd && module.exports.pop()