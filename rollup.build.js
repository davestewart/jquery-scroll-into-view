import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
  entry: 'src/index.js',
  plugins: [
    babel(babelrc()),
    uglify()
  ],
  external: external,
  targets: [
    {
      dest: 'lib/jquery.scroll-into-view.min.js',
      format: 'umd',
      moduleName: 'scrollIntoView',
      sourceMap: false
    }
  ]
};