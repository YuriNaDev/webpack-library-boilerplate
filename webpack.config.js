const path = require('path')

module.exports = {
	mode: 'production',
	entry: './src/library.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		library: 'KmaGrid',
		libraryTarget: 'umd',
		libraryExport: 'default',
		filename: 'kmagrid.min.js',
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
