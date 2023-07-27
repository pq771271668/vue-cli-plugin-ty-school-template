// 获取路径中的文件名
const fileName = function (path) {
	var pos1 = path.lastIndexOf('/');
	var pos2 = path.lastIndexOf('\\');
	var pos = Math.max(pos1, pos2)
	if (pos < 0)
		return path;
	else
		return path.substring(pos + 1);
}

export default fileName