const path = require('path');
const BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");

module.exports = env => {
    const config = {
        entry: './src/index.tsx',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },

        devtool: 'source-map',

        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'awesome-typescript-loader',
                    }
                },
                {
                    test: /\.js$/,
                    use: {
                        loader: 'source-map-loader',
                    }
                }
            ]
        },

        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
        },

        plugins: [
            new BitBarWebpackProgressPlugin(),
        ]
    };

    return config;
};