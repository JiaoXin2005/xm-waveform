import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/xm-waveform.js',
    format: 'cjs',
    sourcemap: true
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
    // serve('./')
  ]
}