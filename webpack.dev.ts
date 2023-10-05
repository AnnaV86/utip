import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import commonConfig from './webpack.common';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const devServer: DevServerConfiguration = {
	historyApiFallback: true,
	allowedHosts: 'all',
	open: true,
	compress: true,
	hot: true,
	port: 3000,
};

const config: Configuration = {
	mode: 'development',
	devtool: 'cheap-module-source-map',

	devServer,
	plugins: [new ReactRefreshWebpackPlugin()],
};

export default merge(commonConfig, config);
