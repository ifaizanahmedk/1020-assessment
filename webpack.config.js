const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		// clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.(png|jpe?g|gif|svg|webp)$/i,
				type: "asset/resource",
			},
		],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
		extensions: [".js", ".jsx"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "index.html",
			meta: {
				charset: { charset: "UTF-8" },
				"http-equiv": {
					"X-UA-Compatible": "IE=edge",
					"Content-Type": "text/html; charset=UTF-8",
				},
				viewport: {
					name: "viewport",
					content: "width=device-width, initial-scale=1.0",
				},
				description: {
					name: "description",
					content: "Lorem ipsum dolor sit",
				},
				author: {
					name: "author",
					content: "1020 Assessment - Faizan Ahmed",
				},
				keywords: {
					name: "keywords",
					content: "Lorem, ipsum, dolor, sit",
				},
				canonical: {
					rel: "canonical",
					href: "https://tentwenty.me",
				},
				"og:type": {
					property: "og:type",
					content: "website",
				},
				"og:title": {
					property: "og:title",
					content: "Lorem ipsum dolor sit",
				},
				"og:description": {
					property: "og:description",
					content: "Lorem ipsum dolor sit",
				},
				"og:image": {
					property: "og:image",
					content: "",
				},
				"og:url": {
					property: "og:url",
					content: "https://tentwenty.me",
				},
				"twitter:card": {
					name: "twitter:card",
					content: "summary_large_image",
				},
				"twitter:site": {
					name: "twitter:site",
					content: "@faizanahmedraza",
				},
				"twitter:title": {
					name: "twitter:title",
					content: "1020 Assessment - Faizan Ahmed",
				},
				"twitter:description": {
					name: "twitter:description",
					content: "Lorem ipsum dolor sit",
				},
				"twitter:image": {
					name: "twitter:image",
					content: "",
				},
			},
			inject: {
				body: true,
			},
		}),
	],
	devServer: {
		static: path.resolve(__dirname, "dist"),
		port: 3000,
		open: true,
		hot: true,
	},
};
