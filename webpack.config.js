const path = require('path')

module.exports = {
	entry: {
		app: './src/index.jsx'
	},
	output: {
		path: path.join(__dirname, '/static'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx/,
				loader: 'babel-loader',
				query: {
					presets: ['@babel/preset-react', '@babel/preset-env']
				}
			},
		]
	},
	optimization: {
	    splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
		        vendors: {
		         	test: /[\\/]node_modules[\\/]/,
		         	priority: -10
		        },
		        default: {
		         	minChunks: 2,
		         	priority: -20,
		         	reuseExistingChunk: true
		        }
	        }
	    }
  	},
  	devServer : {
  		port: 8000,
  		contentBase: 'static',
    	proxy: {
  			'/app/*': { target: 'http://localhost:4000' }
  		},
  		historyApiFallback: true
  	},
  	devtool: 'eval-source-map'
 }