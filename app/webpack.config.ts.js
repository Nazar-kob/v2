const path = require('path');
const { mode } = require('./webpack.config');

module.exports = {
    entry: "./frontend/static/js/index.tsx",
	output: { 
		filename: "index.js",
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
    mode: 'development',
};