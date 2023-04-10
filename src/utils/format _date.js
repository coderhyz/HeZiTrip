import dayjs from "dayjs";
//入住离开日期格式化
export function formatMonthDay(date,formatStr = "MM月DD日") {
    return  dayjs(date).format(formatStr)
}
//住的天数格式化
export function DiffDay(startDate,endDate) {
    return dayjs(endDate).diff(startDate,'day')
}