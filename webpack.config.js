"use strict";

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
}

module.exports = {
	// mode: 'production',
	mode: 'development',
	devtool: 'source-map',
	entry: [
		PATHS.src + '/app.js',
		PATHS.src + '/scss/main.scss',
	],
	output: {
		path: PATHS.dist,
		filename: "js/bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: [
					{
						loader: 'file-loader', options: {
							name: '[path][name].html',
							context: 'src/pug'
						}
					},
					// 'extract-loader',
					// 'html-loader',
					{
						loader: 'pug-html-loader', options: {
							pretty: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					"style-loader", "css-loader"
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
							publicPath: '../fonts/',
						}
					}
				]
			},
			{
				test: /\.(scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "sass-loader"]
				})
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							context: 'src'
							// publicPath: './',
							// outputPath: '/'
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['@babel/env']
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			'window.jQuery': "jquery"
		}),
		new ExtractTextPlugin('/css/style.css')
	]
}