// generator.js
module.exports = (api, options, rootOptions) => {
	api.extendPackage({
		// 命令
		"scripts": {
			"serve": "vue-cli-service serve",
			"build": "vue-cli-service build"
		},
		"dependencies": {
			"@vant/touch-emulator": "^1.4.0",
			"axios": "^0.27.2",
			"babel-polyfill": "^6.26.0",
			"core-js": "^3.8.3",
			"echarts": "^5.3.3",
			"element-ui": "^2.15.13",
			"js-cookie": "^3.0.1",
			"lodash": "^4.17.21",
			"moment": "^2.29.4",
			"vant": "^2.12.52",
			"vconsole": "^3.15.0",
			"vue": "^2.6.14",
			"vue-bus": "^1.2.1",
			"vue-fragment": "^1.6.0",
			"vue-router": "^3.5.1",
			"vuex": "^3.6.2",
			"vuex-persistedstate": "^4.1.0",
			"xe-utils": "3.5.7"
		},
		"devDependencies": {
			"@vue/cli-plugin-babel": "~5.0.0",
			"@vue/cli-plugin-router": "~5.0.0",
			"@vue/cli-plugin-vuex": "~5.0.0",
			"@vue/cli-service": "~5.0.0",
			"babel-plugin-transform-remove-console": "^6.9.4",
			"css-unicode-loader": "^1.0.3",
			"less": "^3.0.4",
			"less-loader": "^5.0.0",
			"sass": "^1.32.7",
			"sass-loader": "^12.0.0",
			"style-resources-loader": "^1.5.0",
			"vue-cli-plugin-style-resources-loader": "^0.1.5",
			"vue-template-compiler": "^2.6.14"
		}
	});
	// 删除 src和public 目录文件
	api.render(files => {
		Object.keys(files)
			.filter(path => path.startsWith('src/') || path.startsWith('public/'))
			.forEach(path => delete files[path])
	})
	// 复制template模版
	api.render('./template');
};