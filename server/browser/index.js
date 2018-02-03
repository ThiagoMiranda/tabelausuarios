import path from 'path';
import Browser from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import webpackConfig from '../webpack.config';

const browser = Browser.create();
const bundler = webpack(webpackConfig);

const config = {
	server: 'public',
	middleware: [
		webpackDevMiddleware(bundler, {
			lazy: false
		})
	],
	open: false,
	watchOptions: {
		ignoreInitial: true,
		ignored: '*.txt'
	},
	files: [{
		match: [path.resolve(__dirname, '../../src/**/*')],
		fn: (event, file) => {
			browser.reload();
		}
	}]
};

browser.init(config);

export { browser };