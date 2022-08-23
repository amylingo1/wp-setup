import webpack from 'webpack';
import defaultConfig from './webpack.default';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries';

export default {
  ...defaultConfig,
  watch: true,
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      allChunks: true,
      filename: '[name].css'
    }),
    new webpack.ProvidePlugin({
      wp: 'wp',
      $: 'jQuery',
      jQuery: 'jQuery',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify( 'development' )
      }
    })
  ]
};
