const getUrlParams = function () {
	var url = window.location.href;
	url = decodeURI(url);
	var argObj = {};
	var urlSplit = url.split("?");
	if (urlSplit.length > 1) {
		var args = urlSplit[1].replace("#", "&").split("&");
		for (var i = 0; i < args.length; i++) {
			var arg = args[i].split("=");
			argObj[arg[0]] = arg[1];
		}
	}
	return argObj;
}
export default getUrlParams