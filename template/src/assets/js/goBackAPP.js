const goBackAPP = function () {
	if (navigator.userAgent.indexOf('Android') > -1) {
		window.jslistener.returnapp();
	} else {
		if (navigator.userAgent.indexOf('iOS_WKWebView') > -1) {
			window.webkit.messageHandlers.returnapp.postMessage(null);
		} else {
			returnapp();
		}
	}
}
export default goBackAPP