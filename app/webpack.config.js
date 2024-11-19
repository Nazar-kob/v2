const path = require('path');

module.exports = {
    entry: "./frontend/static/js/index.tsx",
	output: { 
		filename: "bundle.js",
		path: path.resolve("frontend/static")
	},
    resolve: {
        extensions: ['.tsx', '.ts', ".js"],
        alias: {
            '@/components': path.resolve(__dirname, 'frontend/static/react/components'),
            '@/const': path.resolve(__dirname, 'frontend/static/react/const'),
            '@/ui': path.resolve(__dirname, 'frontend/static/react/components/ui'),
            '@/hooks': path.resolve(__dirname, 'frontend/static/react/hooks')
          },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
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