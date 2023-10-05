import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import ESLintPlugin from 'eslint-webpack-plugin';

const config: Configuration = {
	mode: 'production',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
		minimize: true,
	},
	plugins: [
		new ESLintPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
			failOnError: true,
		}),
	],
};

export default merge(commonConfig, config);
