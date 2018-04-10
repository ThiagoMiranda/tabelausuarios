/* global __dirname, require, module*/
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let plugins = [], outputFile;

if (env === 'build') {
	plugins.push(new UglifyJsPlugin({
		include: /\.min\.js$/,
		minimize: true,
		parallel: true,
		sourceMap: true,
		uglifyOptions: {
			ie8: false
		}
	}));
}

//	Css
const extractSass = new ExtractTextPlugin({
	filename: '[name].css',
	disable: env !== 'build'
});

plugins.push(extractSass);
plugins.push(new OptimizeCssAssetsPlugin({
	assetNameRegExp: /\.min\.css$/g,
	disable: env !== 'build'
}));

const config = {
	context: path.resolve(__dirname, '../src/'),
	entry: {
		'inter.faq': './js/index.js',
		'inter.faq.min': './js/index.js'
	},
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, '../lib'),
		filename: '[name].js',
		library: 'InterFAQ',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: 'css-loader'
					}, {
						loader: 'sass-loader'
					}],
					fallback: 'style-loader'
				})
			},
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: 'eslint-loader'
				},
				exclude: /node_modules/
			},
			{
				test: /\.jsx$/,
				use: [
					{
						loader: 'babel-loader'
					},
					{
						loader: 'nativejsx-loader',
						query: {
							variablePrefix: '_',
							declarationType: 'const'
						}
					}],
				exclude: /node_modules/

			},
			{
				test: /\.svg$/,
				use: {
					loader: 'svg-url-loader'
				}
			}
		]
	},
	resolve: {
		modules: [path.resolve('./node_modules'), path.resolve('./src')],
		extensions: ['.json', '.js']
	},
	plugins: plugins
};

module.exports = config;
