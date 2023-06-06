/* 获取周lists */
/* https://blog.csdn.net/JasonAlonk/article/details/114926885 */
class getDateWeekList {
	constructor(start, end) {
		this.start = start
		this.end = end
	}
	// 获取时间格式
	getDateText(dd) {
		const nDate = new Date(dd)
		const y = nDate.getFullYear();
		let m = nDate.getMonth() + 1; //获取月份
		m = m >= 10 ? m : "0" + m;
		let d = nDate.getDate();
		d = d >= 10 ? d : "0" + d;
		return y + "-" + m + "-" + d;
	}
	// 获取任意日期的 周一 或者 周日
	getMondayOrSunday(date, state) {
		const dd = new Date(date)
		const week = dd.getDay(); //获取时间的星期数
		let minus = 0
		if (state === 'start') {
			minus = week ? week - 1 : 6;
		} else {
			minus = week ? week - 7 : 0;
		}
		// 补时间差值
		return this.getDateText(dd.setDate(dd.getDate() - minus))
	}
	// 补开始时间和结束时间
	fillDate(start, end) {
		return {
			start: this.getMondayOrSunday(start, 'start'),
			end: this.getMondayOrSunday(end, 'end')
		}
	}
	getWeekList() {
		let weekList = []
		let dates = this.fillDate(this.start, this.end)
		let start = new Date(dates.start)
		let end = new Date(dates.end)
		while (start < end) {
			let weekText = ''
			const initStart = this.getDateText(start)
			const s = start.setDate(start.getDate() + 7)
			weekText = initStart + ' 至 ' + this.getDateText(new Date(s).setDate(new Date(s).getDate() - 1))
			weekList.push(weekText)
		}
		return weekList
	}
}
export default getDateWeekList
    /* const weekList = new getDateWeekList('2021/1/1', '2021/4/1')
    console.log(weekList.getWeekList()) */
    //["2020-12-28~2021-1-3", "2021-1-4~2021-1-10", "2021-1-11~2021-1-17", "2021-1-18~2021-1-24", "2021-1-25~2021-1-31", "2021-2-1~2021-2-7", "2021-2-8~2021-2-14", "2021-2-15~2021-2-21", "2021-2-22~2021-2-28", "2021-3-1~2021-3-7", "2021-3-8~2021-3-14", "2021-3-15~2021-3-21", "2021-3-22~2021-3-28", "2021-3-29~2021-4-4"]