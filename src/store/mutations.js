import * as types from './mutation-types'
const mutations={
    [types.SET_PLAYLIST](state,playlist){
        state.playlist=playlist
    },
    SET_AUDIOELE(state,audioEle){
        state.audioEle=audioEle
    },
    SET_CURRENTINDEX(state,currentIndex){
        console.log('输出');
        state.currentIndex=currentIndex
    },
    SET_PLAYING(state,playing){
        state.playing=playing
    }
}

export default mutations