const path = require('path'), fs = require('fs'), webpack = require('webpack');
const Htmlwebpackplugin = require('html-webpack-plugin');
const Copywebpackplugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// for prod
const SvgStore = require('webpack-svgstore-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
//---------



let assets_folder = path.resolve(__dirname, 'src');








module.exports = {
    mode: "production",
    entry: {
        main: ["@babel/polyfill", [assets_folder, "js/index.jsx"].join('/')]
    },
    output: {
        filename: "./[contenthash].js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'css-loader'
                ]
            },
            { test: /\.html$/, use: 'html-loader' },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]',
                },
            },
            {
                test: /\.mp4$/,
                use: 'file-loader?name=videos/[name].[ext]',
            },
            {
                test: /\.(glb|gltf)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: 'assets/models/'
                    }
                }]
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(test.ts|ts)$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            "@babel/preset-typescript"
                        ],
                        plugins: [
                            //"@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            },
            {
                test: /\.(test.js|js)$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-optional-chaining"
                        ]
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            "@babel/preset-react"
                        ],
                        plugins: [
                            //"@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new Htmlwebpackplugin({
            template: [assets_folder, "index.html"].join('/'),
            chunks: ['main']
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["!Photo_gallery"]
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].optimize.css',
            chunkFilename: '[id].optimize.css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.(css|s[ac]ss)$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })

    ],
    devServer: {
        port: 4200
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    resolve: {
        extensions: [
            '.Webpack.js', '.web.js',
            '.js', '.ts', '.jsx',
            '.html',
            '.css', '.scss', '.sass',
            '.svg', '.png', 'jpg'
        ],
        alias: {
            '@styles': path.join(assets_folder, 'style'),
            '@images': path.join(assets_folder, 'images')
        }
    },
}