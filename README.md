一个简单的请假时长计算器

## 安装

```console
$ npm install leave-days-calculator
```

## 引入

```console
import leaveDaysCalculator form 'leave-days-calculator'
```

## 使用

```
const start = '2020-06-22 上午'
const end = '2020-06-24 下午'
let leaveDays = leaveDaysCalculator(start, end) // 3
```
> 时间的格式只支持: YYYY-MM-DD 上午/下午
