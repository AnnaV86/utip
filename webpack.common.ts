import * as path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

declare const __dirname: string;

const config: Configuration = {
	entry: {
		index: { import: './src/index.tsx', dependOn: 'shared' },
		shared: 'lodash',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@src': path.resolve(__dirname, 'src/'),
			'@components': path.resolve(__dirname, 'src/components/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.(scss|css)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 1,
							modules: true,
						},
					},
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './build'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html'),
		}),
	],
	stats: 'errors-only',
};

export default config;
