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
		overlay: true, //当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用
	},
	css: {
	    loaderOptions: {
	        sass: {
	            prependData: `@import "~@/assets/style/variable.scss"; @import "~@/assets/style/extend.scss";@import "~@/assets/style/mixin.scss";`
	        },
			less: {
				modifyVars: {
					// 或者可以通过 less 文件覆盖（文件路径为绝对路径）
					hack: `true; @import  "~@/assets/style/vant.less";`
				},
			},
	    },
	}
}
