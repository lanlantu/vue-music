const lanlantuPlayerMusic = {
  initAudio(that) {
    const ele = that.audioEle
    // 开始播放音乐
    ele.onplay = () => {
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        that.musicReady = true
      }, 100)
    }
    // 当前音乐播放完毕
    ele.onended = () => {
      that.next()
    }

    // 获取当前播放时间
    ele.ontimeupdate = () => {
      that.currentTime = ele.currentTime
    }

  }
}

export default lanlantuPlayerMusic
