const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;


const cssExtract = new ExtractTextPlugin('main.css');

module.exports = {
    target: 'web',
    entry: './app/src/main.js',
    output: {
        path: './public',
        filename: 'index.js'
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/src/index.html'
        }),
        cssExtract
    ],
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
            }
        },  
	      {
            test: /\.scss$/,
            loader: cssExtract.extract(
			'style-loader',
			'css-loader?sourceMap!sass-loader?sourceMap'	
			)
        },{
            test: /\.html$/,
            loader: 'html-loader'	
        }]
    },
    sassLoader:{
        includePaths: ['./app/src/scss/partials']
    }
};