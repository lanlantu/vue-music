export const audioEle = state => state.audioEle
export const playlist = state => state.playlist
export const currentIndex = state => state.currentIndex
export const playing = state => state.playing
export const mode = state => state.mode // 播放模式
// 顺序列表
export const orderList = state => state.orderList

// 网易云用户UID
export const uid = state => state.uid

export const currentMusic = state => {
    return state.playlist[state.currentIndex] || {}
}