import fs from 'fs';
import { resolve } from 'path';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

let entries = {}
const theme = process.env.npm_config_theme
const plugin = process.env.npm_config_plugin
const paths = {
  [`themes/${theme}/admin`]: `./src/themes/${theme}/admin.scss`,
  [`themes/${theme}/style`]: `./src/themes/${theme}/style.scss`,
  [`themes/${theme}/mobile`]: `./src/themes/${theme}/mobile.scss`,
  [`themes/${theme}/foundation`]: `./src/themes/${theme}/foundation.scss`,
  [`themes/${theme}/js/blocks`]: `./src/themes/${theme}/js/blocks.js`,
  [`themes/${theme}/js/additions`]: `./src/themes/${theme}/js/additions.js`,
}

// check if files exists, it requires at least one.
for (var key in paths) {
  if (fs.existsSync(paths[key])) {
    entries[key] = paths[key]
  }
}

export default {
  entry: entries,
  output: {
    path: resolve('./public_html/wp-content/'),
  },
  externals: {
    wp: 'wp',
    $: 'jQuery',
    jQuery: 'jQuery',
  },
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [
      resolve('src'),
      'node_modules',
    ],
    alias: {
      'themes': resolve('./src/themes'),
      'plugins': resolve('./src/plugins'),
      'font-awesome-path': resolve('./node_modules/font-awesome/'),
      'foundation': resolve('./node_modules/foundation-sites/'),
      'bootstrap-npm': resolve('./node_modules/bootstrap/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [/public_html/, /node_modules/]
      },
      {
        test: /\.(ico|jpe?g|png|gif)$/i,
        use: `file-loader?limit=500&name=themes/${theme}/img/[name].[ext]&publicPath=/wp-content/`,
        exclude: [/public_html/]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: [/public_html/],
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer(),
                cssnano()
              ]
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [
                './node_modules/foundation-sites/scss',
                './node_modules/font-awesome/',
                './node_modules/',
                './sass'
              ]
            }
          }
        ]
      },
    ]
  },
};
