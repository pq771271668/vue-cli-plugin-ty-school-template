// 获取路径中的文件名
const fileName = function (path,ext = true) {
	var pos1 = path.lastIndexOf('/');
	var pos2 = path.lastIndexOf('\\');
	var pos = Math.max(pos1, pos2)
	if (pos < 0) {
		if (ext) {
			return path;
		}
		else {
			return path.substring(0, path.lastIndexOf("."));
		}
	}
	else {
		// 带后缀名
		if (ext) {
			return path.substring(pos + 1);
		}
		// 不带后缀名
		else {
			let tempPath = path.substring(pos + 1);
			return tempPath.substring(0, tempPath.lastIndexOf("."));
		}
	}
		
}

export default fileName