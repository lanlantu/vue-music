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