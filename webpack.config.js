const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports =
{
	mode: "development",
	devtool: "inline-source-map",
	entry: "./src/Main.ts",
	module:
	{
		rules:
		[
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.class$/,
				use: "arraybuffer-loader"
			}
		],
	},
	resolve:
	{
		extensions: [ ".js", ".ts" ]
	},
	plugins:
	[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin(
		{
			title: "test"
		})
	],
	output:
	{
		filename: "main.js",
		path: path.resolve(__dirname, "dist")
	},
	devServer:
	{
		contentBase: "./dist",
	},
};
