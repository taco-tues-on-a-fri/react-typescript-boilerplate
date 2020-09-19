const path = require('path')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

const resolve = path.resolve.bind(__dirname)

const PATH = {
	root: resolve('./'),
	dist: resolve('./dist'),
	src: resolve('./src'),
	assets: resolve('./src/assets'),
	utilities: resolve('./src/utilities'),
	components: resolve('./src/components'),
	nodeModules: resolve('./node_modules')
}

const tsConfig = {
  test: /\.tsx?$/,
  include: PATH.src,
  exclude: PATH.nodeModules,
  use: [
    isDevelopment && {
      loader: 'babel-loader',
      options: { plugins: ['react-refresh/babel'] },
    },
    'ts-loader',
  ].filter(Boolean),
}

const htmlConfig = {
	test: /\.html$/,
	use: [
		{
			loader: 'html-loader',
			options: {
				minimize: true
			}
		}
	]
}

const cssConfig = {
	test: /\.css$/,
	use: [
    'style-loader',
    'css-loader',
	]
}

const minifyConfig = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
}

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: ['./src/index.tsx'],
  output: {
    path: PATH.dist,
    filename: isDevelopment ? '[name].js' : '[name].[chunkhash].bundle.js',
    sourceMapFilename: isDevelopment ? '[name].bundle.map' : '[name].[chunkhash].bundle.map',
    chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].[chunkhash].chunk.js',
    publicPath: '/'
  },
  module: {
    rules: [tsConfig, htmlConfig, cssConfig],
  },
  plugins: [
    isDevelopment && new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      inject: true,
      ...(isDevelopment ? {} : { minify: minifyConfig })
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production')
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/',
          to: 'assets/'
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ].filter(Boolean),
  cache: true,
  bail: false,
  devtool: isDevelopment ? 'eval-source-map' : false,
  devServer: {
    hot: true,
    noInfo: true,
    contentBase: './dist',
    historyApiFallback: true
  },
  stats: 'errors-only',
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@src': PATH.src,
      '@root': PATH.root,
      '@assets': PATH.assets,
      '@utilities': PATH.utilities,
      '@components': PATH.components,
      },
    modules: ['src', 'node_modules']
  },
}