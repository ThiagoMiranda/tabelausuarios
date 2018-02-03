// Karma configuration
// Generated on Mon Sep 04 2017 10:43:31 GMT-0300 (-03)
const path = require('path');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    //Local address
    hostname: '0.0.0.0',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	frameworks: ['jasmine'],

	//List of plugins
	plugins: [
		require('karma-webpack'),
		require('karma-jasmine'),
		require('karma-chrome-launcher'),
		require('karma-sourcemap-loader'),
		require('karma-jasmine-html-reporter')
	],


    // list of files / patterns to load in the browser
    files: [
		{pattern: '**/*.js', watched: false}
    ],


    // list of files to exclude
    exclude: [
		'**/*.scss'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'**/*.js': ['webpack']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'kjhtml'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeNoSandbox'],

    customLaunchers: {
      ChromeNoSandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout : 210000,
    browserNoActivityTimeout : 210000,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
	singleRun: true,

	webpack: {
		devtool: 'inline-source-map',
		module: {
			rules: [
				{
					test: /.js$/,
					include: /src/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					enforce: 'pre'
				},
				{
					test: /\.js$/,
					include: path.resolve(__dirname, '../src'),
					exclude: /node_modules/,
					loader: 'babel-loader'
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
					test: /\.scss$/,
					use: [{
						loader: 'css-loader'
					}, {
						loader: 'sass-loader'
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
		}
	}
  })
}
