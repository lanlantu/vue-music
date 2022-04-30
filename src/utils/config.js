// 默认分页数量
export const defaultLimit = 30

// 默认背景图（可引入网络图或本地静态图）
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/background', false)
const BG_ARR = requireAll(req)
export const defaultBG = BG_ARR[Math.floor(Math.random() * BG_ARR.length)]

/**
 * 播放模式
 * listLoop: 列表循环
 * order：顺序
 * random: 随机
 * loop: 单曲循环
 */
export const playMode = {
  listLoop: 0,
  order: 1,
  random: 2,
  loop: 3
}
