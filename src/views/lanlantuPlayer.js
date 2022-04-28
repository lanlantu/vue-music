let retry=1

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

      // 音频缓冲事件
      ele.onprogress = () => {
        try {
          if (ele.buffered.length > 0) {
            const duration = that.currentMusic.duration
            let buffered = 0
            buffered =
              ele.buffered.end(0) > duration ? duration : ele.buffered.end(0)
            that.currentProgress = buffered / duration
          }
        } catch (e) {}
      }

        // 音乐播放出错
    ele.onerror = () => {
        console.log('播放出错');
        that.next(true)
 
    }

  }
}

export default lanlantuPlayerMusic
