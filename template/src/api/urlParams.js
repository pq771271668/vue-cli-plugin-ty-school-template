import getUrlParams from '@/assets/js/util/getUrlParams.js'
import setting from '@/setting'

let platformCode =  getUrlParams().loginPlatformCode || getUrlParams().platformcode || getUrlParams().platformCode ||  setting.platformCode

let account = getUrlParams().account ||  setting.account

let appId = getUrlParams().appId || setting.appId

let ticket = getUrlParams().ticket


console.log("platformCode:"+platformCode);

const UrlParams = {
	platformCode,
	account,
	appId,
	ticket
}
export default UrlParams