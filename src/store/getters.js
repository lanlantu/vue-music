export const audioEle = state => state.audioEle
export const playlist = state => state.playlist
export const currentIndex = state => state.currentIndex
export const playing = state => state.playing

export const currentMusic = state => {
    console.log('我被調用l');
    return state.playlist[state.currentIndex] || {}
}