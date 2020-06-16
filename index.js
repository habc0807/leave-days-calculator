/**
* @Authors habc0807 (gao0807@foxmail.com)
* @Date: 2020-05-31

* @Last Modified by: habc0807
* @Last Modified time: 2020-06-16

* 请假时长计算器：（通过 （开始时间 + 结束时间）计算请假时长）
* tags tagt是开始和结束的上午下午的标记
* timeGap timeGapt是当天和隔天间隔时间的计算值
*/

export default (start, end) => {
    if(!start || !end) return 0

    const [times, tags] = start.split(' ')
    const [timet, tagt] = end.split(' ')
    const startStr = +new Date(...times.split('-'))
    const endStr = +new Date(...timet.split('-'))
    const timeGap = tagt === tags ? 0.5 : {'上午': 0, '下午': 1 }[tagt] // 当天
    const timeGapt = tagt === tags ? 0.5 : {'上午': 0, '下午': 1 }[tagt] // 隔天
    
    if(startStr > endStr) {
        return 0
    }
    else if(timet === times) {
        return timeGap
    } 
    else {
        return (endStr - startStr) / (60 * 60 * 24 * 1000) + timeGapt
    }
}
// console.log(getLeaveDays('2020-06-22 上午', '2020-06-24 下午'))
// console.log(getLeaveDays('2019-12-31 上午', '2020-01-01 上午'))