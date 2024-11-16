const path = require('path')

module.exports = {
	entry: "./frontend/static/js/index.js",
	output: { 
		filename: "bundle.js",
		path: path.resolve("frontend/static")
	},
	module: {
		rules: [
			 {
				  test: /\.js?$/,
				  exclude: /(node_modules)/,
				//   use: "ts-loader", 
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								["@babel/preset-env", {
										"useBuiltIns": "usage",
										"corejs": 3,
								}],
								"@babel/preset-react"
							],
							plugins: [
								'@babel/plugin-proposal-class-properties',
								'@babel/plugin-proposal-private-methods'
							]
						}
				}
			 }
		]
  },
  resolve: {
	extensions: ['.js'], 
	},
	mode: 'development',
}