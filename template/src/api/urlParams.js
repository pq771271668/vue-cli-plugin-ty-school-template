import getUrlParams from '@/assets/js/util/getUrlParams.js'
let platformCode =  getUrlParams().loginPlatformCode || getUrlParams().platformcode || getUrlParams().platformCode ||  '420100'

let account = getUrlParams().account || 'bieke' 

let appId = getUrlParams().appId || ''

let ticket = getUrlParams().ticket


console.log("platformCode:"+platformCode);

const UrlParams = {
	platformCode,
	account,
	appId,
	ticket
}
export default UrlParams