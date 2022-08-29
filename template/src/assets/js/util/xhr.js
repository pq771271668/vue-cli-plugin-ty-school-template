const XHR = function (options) {
	const method = options.method || 'get'
	const url = options.url
	const async = options.async || false
	
	let xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	//2.打开与服务器的链接
	xhr.open(method,url,async);
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				options.success(JSON.parse(xhr.response)) 
			} else {
				options.fail(xhr.statusText);
			}
		}
		else {
			options.fail(e);
		}
	};
	xhr.send(null);
}
export default XHR