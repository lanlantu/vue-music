export const LANLANTU_VERSION= '1.1.0'

export const NOTICE_INFO = `<div>
当前版本: ${LANLANTU_VERSION}（${process.env.VUE_APP_UPDATE_TIME}）<br>
历史版本：<br>
1.0.0<br>
1、 开发完成版本<br>
2、 规划的功能基本都已实现，细节方面可以优化<br>
3、 目前正在增加新功能、优化中<br>
4、 存在一些bug，正在修复优化中<br>
<br>
1.1.0<br>
1、 修复网站打开音量为静音<br>
2、 修复调节音量控制台报错<br>

</div>`


// 默认分页数量
export const defaultLimit = 30

//默认音量
export const defaultVolume=0.5;

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
