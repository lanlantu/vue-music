
// 时间格式化
export function format(value) {
  let minute = Math.floor(value / 60)
  let second = Math.floor(value % 60)
  return `${addZero(minute)}:${addZero(second)}`
}

// 补0函数
export function addZero(s) {
  return s < 10 ? '0' + s : s
}