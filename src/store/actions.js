import * as types from './mutation-types'
export const setPlaylist =function(context,list) {
        context.commit(types.SET_PLAYLIST,list)
        
}
