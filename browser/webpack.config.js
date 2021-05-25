const path = require('path');
// import path from 'path';


module.exports = {
    entry: './src/app.tsx',
    //mode: 'production',
    mode: 'development',
    //devtool: 'eval-source-map',
    watch: false,
    stats: {
        warnings: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.d.ts', '.json'],
    },
    output: {
        filename: 'app.min.js',
        //path: path.resolve(__dirname, './src') 
        path: path.resolve(__dirname, '../server/static') 
    },
    plugins: [
        //new BundleAnalyzerPlugin(), // Analyse build - cool
    ],
    //externals: [
    //    {
    //        'react': 'React',
    //        'react-dom': 'ReactDOM',
    //    }
    //],
    stats: {
        // Don't display most things
        all: false,
        colors: true,
        errors: true,
        builtAt: true
    }
};

