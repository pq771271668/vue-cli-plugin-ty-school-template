import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './routerPage.js'

Vue.config.productionTip = false

// 主要用于兄弟组件之间的通信
import VueBus from 'vue-bus'
Vue.use(VueBus)

import "babel-polyfill"

import vuexStore from '@/mixins/store.js'
Vue.mixin(vuexStore);

// 自定义全局指令
import direvtive from '@/directive/index.js'
Vue.use(direvtive)

// 自定义过滤器
import filter from '@/filter/index.js'
Vue.use(filter)

// lodash
import _ from 'lodash';
Vue.prototype._ = _

// XEUtils
import _XEUtils_ from 'xe-utils'
Vue.prototype.XEUtils = _XEUtils_

// 引入iconfont
import '@/assets/fonts/iconfont.css'
import '@/assets/fonts/iconfont.js'

// 引入element-ui
import ElementUI from '@/setting/ElementUI.js'
import '@/assets/style/element-variables.scss'
Vue.use(ElementUI, ElementUI.Global)

//vant
import Vant from 'vant';
import '@vant/touch-emulator';
import 'vant/lib/index.less';
Vue.use(Vant);

//引入base.scss
import '@/assets/style/base.scss'

// fragment
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

//验证
import validator from '@/assets/js/validator.js'
Vue.prototype.$validator = validator

//引入
import moment from 'moment';
//挂载到原型
Vue.prototype.$moment = moment ;
//汉化，否则显示日期格式是国外的日期格式
moment.locale("zh-CN");

// util
import util from '@/assets/js/util.js'
Vue.prototype.$util = util

//http
import request from '@/assets/js/request/index.js'
Vue.prototype.$axios = request

// 字典项
import dict from '@/dict/index.js'
Vue.prototype.$dict = dict

// echart
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

// 全局设置项
import setting from '@/setting/index.js'
Vue.prototype.$setting = setting

// 基础组件全局化
import '@/components/common/index.js'

import '@/components/base/index.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
