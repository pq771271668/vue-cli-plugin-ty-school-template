import getUrlParams from '@/assets/js/util/getUrlParams.js'
import setting from '@/setting'

let platformCode =  getUrlParams().loginPlatformCode || getUrlParams().platformcode || getUrlParams().platformCode ||  setting.urlParams.platformCode

const defaultParams = Object.assign({},setting.urlParams,{platformCode})

const UrlParams = Object.assign({},defaultParams,getUrlParams())

console.log("UrlParams:"+JSON.stringify(UrlParams));

export default UrlParams