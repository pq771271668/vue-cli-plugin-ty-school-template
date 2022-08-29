/*
 * @Author: your name
 * @Date: 2021-09-14 11:16:31
 * @LastEditTime: 2021-12-22 10:44:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tyedu-ui\packages\toast\src\main.js
 */
import Vue from "vue";
import Main from "./main.vue";
const AlterInstance = {
	name: "alert",
	Instance: Vue.extend(Main),
	vm: null,
};

const genStyle = function(el) {
	return `position:fixed;z-index:9999;width:${el.clientWidth}px;height:${
    el.clientHeight
  }px;top:50%;left:50%;margin-left:${-el.clientWidth /
    2}px;margin-top:${-el.clientHeight / 2}px;`;
};

const Alert = function(options = {}) {
	if (Vue.prototype.$isServer) return;
	if (typeof options === "string" || typeof options === "number") {
		options = {
			message: options,
		};
	}
	const instance = new AlterInstance.Instance({
		data: options
	});
	instance.$mount();
	const el = instance.$el;
	document.body.appendChild(el);
	let curEl = options.mask ? el.children[1] : el.children[0];
	curEl.style.cssText = genStyle(curEl);
	return instance;
};

export default Alert;
