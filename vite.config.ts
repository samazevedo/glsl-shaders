import { defineConfig } from 'vite'
import path from 'path'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
	// plugins
	plugins: [glsl()],

	base: './',
	root: path.join(__dirname, 'src'),

	publicDir: '',

	//server options for dev
	server: {
		host: 'localhost',
		port: 3000,
		strictPort: true,
		open: true,
	},

	// build options
	build: {
		outDir: './dist',
		assetsDir: 'assets',
		minify: 'terser',
		sourcemap: true,
		rollupOptions: {
			// external: ['vue', 'react'],
			output: {
				// config output asset file names
				entryFileNames: 'js/[name]-[hash].js',
				chunkFileNames: 'js/[name]-[hash].js',
				assetFileNames: '[ext]/[name]-[hash].[ext]',
			},
			input: {
				main: path.resolve(__dirname, 'src/html/index.html'),
			},
		},
		// code splitting options
		dynamicImportVarsOptions: {
			exclude: ['excluded-module'],
		},
	},

	// resolve options
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
})
