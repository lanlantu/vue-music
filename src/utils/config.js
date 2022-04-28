
// 默认背景图（可引入网络图或本地静态图）
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/background', false)
const BG_ARR = requireAll(req)
export const defaultBG = BG_ARR[Math.floor(Math.random() * BG_ARR.length)]

