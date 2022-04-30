import * as types from './mutation-types'
const mutations = {
    [types.SET_PLAYLIST](state, playlist) {
        state.playlist = playlist
    },
    SET_AUDIOELE(state, audioEle) {
        state.audioEle = audioEle
    },
    SET_CURRENTINDEX(state, currentIndex) {
        state.currentIndex = currentIndex
    },
    SET_PLAYING(state, playing) {
        state.playing = playing
    },
    // 修改播放模式
    [types.SET_PLAYMODE](state, mode) {
        state.mode = mode
    },
    // 修改网易云用户UID
    [types.SET_UID](state, uid) {
        state.uid = uid
    }
}

export default mutations