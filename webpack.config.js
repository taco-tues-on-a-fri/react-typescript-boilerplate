const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
	loaders: [
		'react-hot-loader/webpack',
		{
			loader: 'ts-loader',
			options: {
				transpileOnly: true,
				compilerOptions: {
					sourceMap: true,
					target: 'es5',
					isolatedModules: true,
					noEmitOnError: false
				}
			}
		}
	],
	exclude: PATH.nodeModules,
	include: PATH.src
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
		'css-hot-loader',
    'css-loader',
    'style-loader'
	]
}

module.exports = (env = {}) => {
	const isDev = env.dev;

	return {
		entry: ['./src/index.tsx'],
		output: {
			path: PATH.dist,
			filename: isDev ? '[name].js' : '[name].[chunkhash].bundle.js',
			sourceMapFilename: isDev ? '[name].bundle.map' : '[name].[chunkhash].bundle.map',
			chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash].chunk.js',
			publicPath: '/'
		},
		module: {
			rules: [tsConfig, htmlConfig, cssConfig ]
		},
		resolve: {
			alias: {
				'@src': PATH.src,
				'@root': PATH.root,
				'@assets': PATH.assets,
				'@utilities': PATH.utilities,
				'@components': PATH.components,
				'react-dom': '@hot-loader/react-dom'
			},
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
			modules: ['src', 'node_modules']
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './src/index.html',
				filename: './index.html',
				inject: true,
				...(isDev
					? {}
					: {
							minify: {
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
          })
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(isDev ? 'development' : 'production')
				}
			}),
			new CopyWebpackPlugin({
				// @ts-ignore
				patterns: [
					{
						from: 'src/assets/',
						to: 'assets/'
					}
				]
			}),
			new MiniCssExtractPlugin({
				filename: isDev ? '[name].css' : '[name].[hash].css',
				chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
			})
		],
		cache: true,
		bail: false,
		devtool: isDev ? 'eval-source-map' : false,
		devServer: {
			hot: true,
			noInfo: true,
			contentBase: './dist',
			historyApiFallback: true
		},
		stats: 'errors-only',
		performance: {
			hints: false
		}
	}
}

// module.exports = {
//   entry: './src/App.tsx',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'index_bundle.js',
//     publicPath: '/'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//       { test: /\.(js)$/, use: 'babel-loader' },
//       { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
//       { 
//         test: /\.(png|svg|jpg|gif)$/,
//         use: [ 
//           'file-loader',
//         ]
//       }
//     ]
//   },
//   resolve: {
//     extensions: [ '.tsx', '.ts', '.js' ],
//   },
//   mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
//   node: {
//     fs: 'empty'
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html'
//     }),
//     new CopyPlugin({
//       patterns: [
//         { from: '_redirects'},
//         { from: './src/public'}
//       ],
//     }),
//   ],
//   devServer: {
//     historyApiFallback: true
//   }
// };