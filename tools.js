const getLeaveDays = (arr)=> {
    const [start, end] = arr
    const [times, tags] = arr[0].split(' ')
    const [timet, tagt] = arr[1].split(' ')
    const startStr = +new Date(...times.split('-'))
    const endStr = +new Date(...timet.split('-'))
    const timeDiff = tagt === tags ? 0 : {'上午': 0, '下午': 1 }[tagt]
    if(timet === times){
        return tagt === tags ? 0.5 : timeDiff || -1
    }else if(startStr > endStr){
        return -1
    }else{
        return (endStr - startStr)/(60*60*24*1000) + (tagt === tags ? 0.5 : timeDiff)
    }
    
}
// tags tagt是开始和结束的上午下午的标记，如果相等就不考虑，不等的话，结束的tag是下午，前一个就是上午，差值就是1，否则就没有差值