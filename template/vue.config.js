const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	publicPath: './',
	productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
	outputDir: process.env.VUE_APP_OUTPUTDIR,
	configureWebpack: {
		resolve: {
			extensions: ['.js', '.vue', '.json'],
			alias: {
				'vue$': 'vue/dist/vue.esm.js',
				'@': path.resolve(__dirname, 'src')
			}
		}
	},

	devServer: {
		hot: true,
		port: 9999, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
		open: true,
		// overlay: true, //vue-cli4当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用
	},
	css: {
	    loaderOptions: {
			less: {
				modifyVars: {
					// 或者可以通过 less 文件覆盖（文件路径为绝对路径）
					hack: `true; @import  "~@/assets/style/vant.less";`
				},
			},
	    },
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: [
				path.resolve(__dirname, './src/assets/style/variable.scss'),
				path.resolve(__dirname, './src/assets/style/extend.scss'),
				path.resolve(__dirname, './src/assets/style/mixin.scss')
			]
		}
	},
	configureWebpack: config => {
		/* 解决element-ui打包之后icon乱码的问题 */
	    const sassLoader = require.resolve('sass-loader');
	    config.module.rules.filter(rule => {
	      return rule.test.toString().indexOf("scss") !== -1;
	    })
		.forEach(rule => {
	        rule.oneOf.forEach(oneOfRule => {
				const sassLoaderIndex = oneOfRule.use.findIndex(item => item.loader === sassLoader);
				oneOfRule.use.splice(sassLoaderIndex, 0,
				{ loader: require.resolve("css-unicode-loader") });
	        });
		});
	}
}
