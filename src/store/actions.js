import * as types from './mutation-types'
import {setMode} from '@/utils/storage'
export const setPlaylist =function(context,list) {
        context.commit(types.SET_PLAYLIST,list)
        
}
// 设置播放模式
export const setPlayMode = function({ commit }, mode) {
        commit(types.SET_PLAYMODE, setMode(mode))
      }