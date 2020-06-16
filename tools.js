
/**
* @Authors habc0807 (gao0807@foxmail.com)
* @Date: 2020-05-31

* @Last Modified by: habc0807
* @Last Modified time: 2020-06-02
* 请假时长计算器：（通过 （开始时间 + 结束时间）计算请假时长）
* 1.是否是同一天 同一个天，看上下午，计算天数
* 2.非同一天
* 3.是否同月
* 4.是否同年
* 5.跨年
* 6.间隔年
*/

/**
 * 是否是闰年
 * @param {*} year 
 */
function isLeapYear (year) {
    return year % 100 !== 0 && year % 4 === 0 || year % 400 === 0
}


/**
 * 获取每年每月的天数
 * @param {*} year 
 * @param {*} month 
 */
function getMaxDay (year, month) {
    year = parseInt(year)
    month = parseInt(month)
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28
    }
    return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31
}


// 去0
function trimZero (val) {
    val = String(val)
    val = val ? parseInt(val.replace(/^0+/g, '')) : ''
    val = val || 0
    val = val + ''
    return val
}

/**
 * 同一天请假
 */
function sameDayLeave(startNoon, endNoon) {
    // 四种情况 
    // 1. 开始上午 结束上午 可请假 0.5
    // 2. 开始下午 结束下午 可请假 0.5，既同为上午或者下午，请假 0.5
    // 3. 开始上午 结束下午 可请假 
    // 4. 开始下午 结束上午 报错 
    
    let leaveDays = 0
    if (startNoon === endNoon) {
        leaveDays = 0.5
    } 
    else if (startNoon === '上午' && endNoon === '下午') {
        leaveDays = 1
    } 
    else if (startNoon === '下午' && endNoon === '上午') {
        console.log('您选择的时间有误')
    }
    return leaveDays
}


/**
 * 隔天请假
 */
function nextDayLeave(startDay, endDay, startNoon, endNoon) {
    // 同年同月
    // 29号上午 31号上午 +0.5
    // 29号上午 31号下午 +1
    // 29号下午 31号上午 
    // 29号下午 31号上午 +0.5
    // 四种情况
            
    let leaveDays = 0
    if (startNoon === endNoon) {
        leaveDays = endDay - startDay + 0.5 
    } 
    else if (startNoon === '上午' && endNoon === '下午') {
        leaveDays = endDay - startDay + 1 
    } 
    else if (startNoon === '下午' && endNoon === '上午') {
        leaveDays = endDay - startDay
    }
    return leaveDays
}


/**
 * 开始月份请假天数 跨月，年才会用到的函数
 */
function startMonthLeaveDays (startMonthAllDays, startDay, startNoon) {
    let startMonthLeave = 0
    if (startNoon === '上午') {
        startMonthLeave = Number(startMonthAllDays) -  Number(startDay) + 1
    } else if (startNoon === '下午') {
        startMonthLeave = Number(startMonthAllDays) -  Number(startDay) + 0.5
    }
    return Number(startMonthLeave)
}


/**
 * 结束月的请假天数 跨月，年才会用到的函数
 */
function endMonthLeaveDays(endDay, endNoon) {
    let endLeaveDays = 0
    if (endNoon === '上午') {
        endLeaveDays = endDay - 0.5
    } else if (endNoon === '下午') {
        endLeaveDays = endDay
    }
    return Number(endLeaveDays)
}


/**
 * 通过开始时间和结束时间，计算请假时长
 * @param {*} start 【支持：格式 yyyy-mm-dd n】
 * @param {*} end 【支持：格式 yyyy-mm-dd n】
 */
export default (start, end) => {
    if(!start || !end) return 0

    const startArr = start.split(' ') // 开始时间
    const endArr = end.split(' ') // 结束时间
    const startDate = startArr[0] // 开始日期
    const endDate = endArr[0] // 结束日期


    const startDateArr = startDate.split('-') // 开始日期 数组化
    const endDateArr = endDate.split('-') // 结束日期 数组化


    const startYear = startDateArr[0] // 开始日期：年
    const startMonth = startDateArr[1] // 开始日期：月
    const startDay = startDateArr[2] // 开始日期：日
    const startNoon = startArr[1] // 开始时间的上下午


    const endYear = endDateArr[0] // 结束日期：年
    const endMonth = endDateArr[1] // 结束日期：月
    const endDay = endDateArr[2] // 结束日期：日
    const endNoon = endArr[1] // 结束时间的上下午


    // 开始月份的总天数
    const startMonthAllDays = getMaxDay(startYear, startMonth)


    /**
     * 中间月份的请假天数计算
     */
    function centerMonthsLeave() {
        // 中间月份天数累加
        let leaveDays = 0
        let monthArr = [] // 月份数组
        for(let i = Number(trimZero(startMonth)); i <= Number(trimZero(endMonth)); i++) {
            monthArr.push(i)
        }

        let everyMonthDays = 0
        if (monthArr.length > 2) {
            monthArr.pop()
            monthArr.shift()
            
            monthArr.forEach(month => {
                everyMonthDays = Number(everyMonthDays) + Number(getMaxDay(startYear, month))
            })
        }
        return (Number(leaveDays) + Number(everyMonthDays)).toFixed(1)
    }


    /**
     * 开始月份和结束月份请假天数  相邻月请假，或则跨月请假
     */
    function startEndMonthNext() {
        // 开始月份请假天数计算
        let startLeaveDays = startMonthLeaveDays(startMonthAllDays, startDay, startNoon) 
        
        // 结束月份请假天数计算
        let endLeaveDays = endMonthLeaveDays(endDay, endNoon)

        // 天数累加
        return Number(startLeaveDays) + Number(endLeaveDays) || 0
    }


    /**
     * 开始年的请假天数计算
     */
    function startYearLeaveDays () {
        // 开始月份天数计算
        let startMonthDays = startMonthLeaveDays(startMonthAllDays, startDay, startNoon) 

        // 剩下月份的天数
        let otherMonthDays = 0
        for(let i = Number(trimZero(startMonth)) + 1;  i <= 12; i++) {
            otherMonthDays = Number(otherMonthDays) + Number(getMaxDay(startYear, i))
        }

        return Number(startMonthDays) + Number(otherMonthDays) || 0
    }


    /**
     * 结束年的请假天数计算
     */
    function endYearLeaveDays() {
        let endYearDays = 0
        // 结束月份计算
        let endLeaveDays = endMonthLeaveDays(endDay, endNoon)

        // 前几个月份天数累加
        for(let i = 1; i < trimZero(endMonth); i++) {
            endYearDays = Number(endYearDays) + Number(getMaxDay(endYear, i))
        }

        return Number(endYearDays) + Number(endLeaveDays)
    }


    /**
     * 跨年，中间年假期计算
     */
    function centerYearsLeaveDays () {
        let centerYear = 0
        if(endYear - startYear > 1) {
            let centerYears = []
            for(let startYear; startYear < endYear; startYear++) {
                centerYears.push(startYear)
            }
            centerYears.pop()
            centerYears.shift()
            centerYears.forEach(year => {
                for(let month = 1; month <=12; month++) {
                    centerYear = centerYear + getMaxDay(year, month)
                }
            })
        }
        return centerYear
    }

    // 请假天数
    let leaveAllDays = 0
    // 是否同年
    if (startYear === endYear) {
        // 是否同月
        if (startMonth === endMonth) {
            // 是否同天
            if (startDay === endDay) {
                leaveAllDays = sameDayLeave(startNoon, endNoon)

            // 同年 同月 隔天请假计算
            } else if (startDay < endDay) {
                leaveAllDays = nextDayLeave(startDay, endDay, startNoon, endNoon)

            } else {
                console.log('结束时间的天不对')
            }

        // 同年 不是同月
        } else if (startMonth < endMonth) {
            // 两个月相邻情况, 开始月份剩余天数，结束月份请假天数 之和
            let startEndMonthLeaveDays = startEndMonthNext()

            // 中间月份请假的天数
            let centerMonthsDays = centerMonthsLeave()

            // 请假天数汇总
            leaveAllDays = Number(startEndMonthLeaveDays) + Number(centerMonthsDays)
        } else {
            console.log('结束时间的月份不对')
        }

    // 不是同年
    } else if (startYear < endYear) {
        // 开始年的请假天数计算: 开始月剩下的天数 + 剩下月份的天数
        let startYearDays = startYearLeaveDays()

        // 结束年的请假天数计算: 结束月的天数 + 结束月之前月份的天数
        let endYearDays = endYearLeaveDays()

        // 中间年份的天数
        let centerYear = centerYearsLeaveDays()
        
        // 请假天数汇总累加
        leaveAllDays = Number(startYearDays) + Number(endYearDays) + Number(centerYear)
    } else {
        console.log('结束时间的年份不对')
    }

    // console.log(leaveAllDays)s
    return leaveAllDays
}