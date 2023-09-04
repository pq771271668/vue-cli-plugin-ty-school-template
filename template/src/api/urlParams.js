import getUrlParams from '@/assets/js/util/getUrlParams.js'
import setting from '@/setting'

let platformCode =  getUrlParams().loginPlatformCode || getUrlParams().platformcode || getUrlParams().platformCode ||  setting.urlParams.platformCode

const UrlParams = Object.assign({},setting.urlParams,getUrlParams(),{platformCode})

console.log("UrlParams:"+JSON.stringify(UrlParams));

export default UrlParams
