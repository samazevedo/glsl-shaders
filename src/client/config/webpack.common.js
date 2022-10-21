const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: './src/client/ts/index.ts', // file used as entry point

	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'ts-loader',
				exclude: ['/node_modules/']
			},

			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset'
			},
			{
				test: /\.(glsl|glb|vs|fs|vert|frag)$/,
				type: 'asset/resource',
				exclude: ['/node_modules/'],
				// type: 'asset/source',
				use: [
					'raw-loader',
					{
						loader: 'glslify-loader',
						options: {
							transform: [['glslify-hex'], ['glslify-import']]
							// basedir: '../glsl/'
						}
					}
				]
			}
			// {
			//     test: /\.(js|jsx)$/i,
			//     exclude: '/node_modules',
			//     use: {
			//         loader: 'babel-loader',
			//         options: {
			//             presets: ['@babel/env'],
			//             plugins: ['@babel/plugin-proposal-class-properties'],
			//         },
			//     },
			// },
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...']
		// modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
	},
	devtool: 'source-map',
	optimization: {
		innerGraph: true
	},

	plugins: [
		// clean webpack plugin  removes the output path folder content
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				'**/*' // remove all files and subfolders inside output path
				// path.join(process.cwd(), 'build/**/*'), //specify a absolute path to be removed
			]
		}),
		new TerserPlugin(),
		new HtmlWebpackPlugin({
			title: 'GLSL Shaders',
			filename: 'html/index.html', // output file name and folder
			// template: '../html/index.html',
			meta: {
				description: 'Learning to create and use shaders'
			}
		})
	]
};
