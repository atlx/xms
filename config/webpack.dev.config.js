const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {spawn} = require("child_process");
const {CheckerPlugin} = require("awesome-typescript-loader");

// Config directories.
const BASE_DIR = path.resolve(__dirname, "..");

const resolve = (pathString) => path.resolve(BASE_DIR, pathString);

const SRC_DIR = resolve("src");
const OUTPUT_DIR = resolve("dist");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up.
const defaultInclude = [SRC_DIR];

const resourcesPath = path.resolve(SRC_DIR, "resources");

module.exports = {
	entry: SRC_DIR + "/index.tsx",

	output: {
		path: OUTPUT_DIR,
		publicPath: "/",
		filename: "bundle.js"
	},

	module: {
		rules: [
			// Load SCSS + Sass files.
			{
				test: /\.scss$/,

				use: [
					// Creates style nodes from JS strings.
					{
						loader: "style-loader"
					},

					// Translates CSS into CommonJS.
					{
						loader: "css-loader",

						options: {
							// Allows CSS class name isolation.
							// TODO: Messing up styles.
							// modules: true
						}
					},

					// Compiles Sass to CSS.
					{
						loader: "sass-loader"
					}
				]
			},

			// Load CSS files.
			{
				test: /\.css$/,

				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				],

				include: defaultInclude
			},

			// Load TypeScript + TypeScript/React files
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},

			// Load JavaScript + JavaScript/React files
			{
				test: /\.jsx?$/,
				use: [{loader: "babel-loader"}],
				include: defaultInclude
			},

			// Load images.
			{
				test: /\.(jpe?g|png|gif)$/,
				use: [{loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]"}],
				include: path.resolve(resourcesPath, "img")
			},

			// Load fonts.
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [{loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]"}],
				include: path.resolve(resourcesPath, "fonts")
			},

			// Load sound files.
			{
				test: /\.wav$|\.mp3$/,
				exclude: /node_modules/,
				use: [{loader: "file-loader?name=sounds/[name]__[hash:base64:5].[ext]"}],
				include: path.resolve(resourcesPath, "sounds")
			},

			// Load other assets.
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: [{loader: "file-loader?name=assets/[name]__[hash:base64:5].[ext]"}],
				include: resourcesPath
			}
		]
	},

	target: "electron-renderer",

	plugins: [
		new HtmlWebpackPlugin({
			title: "XMS"
		}),

		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		}),

		new CheckerPlugin()
	],

	devtool: "cheap-source-map",

	devServer: {
		contentBase: OUTPUT_DIR,
		port: 7070,

		stats: {
			colors: true,
			chunks: false,
			children: false
		},

		before() {
			spawn("electron", ["."], {
				shell: true, env: process.env, stdio: "inherit"
			}).on("close", code => process.exit(code)).on("error", spawnError => console.error(spawnError));
		}
	},

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],

		alias: {
			"@": SRC_DIR
		}
	},

	mode: "development"
};
