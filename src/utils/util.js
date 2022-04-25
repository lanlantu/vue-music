
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


export function isPromise(v) {
  return v !== undefined && v !== null && typeof v.then === 'function'
}

export function silencePromise(value) {
    if (isPromise(value)) {
    value.then(null, () => {})
  }
}