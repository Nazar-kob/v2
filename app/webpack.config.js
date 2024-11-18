const path = require('path');

module.exports = {
    entry: "./frontend/static/js/index.tsx",
	output: { 
		filename: "bundle.js",
		path: path.resolve("frontend/static")
	},
    resolve: {
        extensions: ['.tsx', '.ts', ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true, // Enable hot reload
      },
    mode: 'production',
};