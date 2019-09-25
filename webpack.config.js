const path = require('path')

module.exports = {
	mode: 'production',
	entry: './src/library.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		library: 'Rectangle',
		libraryTarget: 'umd',
		libraryExport: 'default',
		filename: 'rectangle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
}
