// vuex入口文件
import Vue from 'vue'
import Vuex from 'vuex'

import isMobile from '@/assets/js/util/isMobile.js'

import request from '@/assets/js/request/index.js'

// import SecureLS from "secure-ls";
// const ls = new SecureLS({ isCompression: false });

// vuex持久化插件
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import PACKAGE from '/package.json'

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	plugins:[
		createPersistedState({
			key:PACKAGE.name,
			storage:window.sessionStorage, //设置存储到sessionStorage
			/* storage: {
				getItem: (key) => ls.get(key),
				setItem: (key, value) => ls.set(key, value),
				removeItem: (key) => ls.remove(key),
			} */
			/* 本地化需要本地化的state，目前内置为下面三个 */
			reducer(val) {
				let {KEEPALIVE,USERINFO,isMobile} = val
				return {
					KEEPALIVE,USERINFO,isMobile
				}
			}
		})
	],
	state:{
		KEEPALIVE:[],
		USERINFO:{},
		isMobile:isMobile(),
	},
	mutations:{
		// this.$vuex('token',token)
		$store(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(nameArr.length >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
		},
		/* 新增页面kaap-alive */
		ADDKEEPALIVE (state,value) {
			if (!state.KEEPALIVE.includes(value)) {
				state.KEEPALIVE.push(value)
			}
		},
		/* 删除页面kaap-alive */
		REMOVEKEEPALIVE (state,value) {
			const index = state.KEEPALIVE.indexOf(value)
			if (index > -1) {
				state.KEEPALIVE.splice(index,1)
			}
		}
	},
	actions:{
	}
})
