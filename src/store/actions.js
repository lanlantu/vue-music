import * as types from './mutation-types'
import { setMode, setUserId } from '@/utils/storage'

export const setPlaylist = function (context, list) {
        context.commit(types.SET_PLAYLIST, list)

}
// 设置播放模式
export const setPlayMode = function ({ commit }, mode) {
        commit(types.SET_PLAYMODE, setMode(mode))
}
// 设置网易云用户UID
export const setUid = function ({ commit }, uid) {
        commit(types.SET_UID, setUserId(uid))
}


// 选择播放（会更新整个播放列表）
export const selectPlay = function({ commit }, { list, index }) {
        commit(types.SET_PLAYLIST, list)
        commit(types.SET_CURRENTINDEX, index)
        commit(types.SET_PLAYING, true)
      }