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
			"core-js": "^3.6.5",
			"echarts": "^5.3.3",
			"element-ui": "^2.15.11",
			"js-cookie": "^3.0.1",
			"lodash": "^4.17.21",
			"vant": "^2.12.52",
			"vconsole": "^3.15.0",
			"vue": "^2.6.11",
			"vue-bus": "^1.2.1",
			"vue-fragment": "^1.6.0",
			"vue-router": "^3.2.0",
			"vuex": "^3.4.0",
			"vuex-persistedstate": "^4.1.0",
			"xe-utils": "^3.5.7"
		},
		"devDependencies": {
			"@vue/cli-plugin-babel": "~4.5.13",
			"@vue/cli-plugin-router": "~4.5.13",
			"@vue/cli-plugin-vuex": "~4.5.13",
			"@vue/cli-service": "~4.5.13",
			"babel-plugin-transform-remove-console": "^6.9.4",
			"css-unicode-loader": "^1.0.3",
			"less": "^3.0.4",
			"less-loader": "^5.0.0",
			"sass": "^1.26.5",
			"sass-loader": "^8.0.2",
			"vue-template-compiler": "^2.6.11"
		}
	});
	// 删除 vue-cli3 默认目录
	api.render(files => {
		Object.keys(files)
			.filter(path => path.startsWith('src/') || path.startsWith('public/'))
			.forEach(path => delete files[path])
	})
	// 复制template模版
	api.render('./template');
};
