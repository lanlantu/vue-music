<template>
  <!--进度条拖动-->
  <div ref="musicProgress" class="musicProgress" @click="barClick">
    <div class="musicProgress-bar"></div>
    <div ref="musicPercentProgress" class="musicProgress-outer"></div>
    <div ref="musicProgressInner" class="musicProgress-inner">
      <div class="musicProgress-dot"></div>
    </div>
  </div>
</template>

<script>
const dotWidth = 10;
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    // 进度值二（歌曲缓冲进度用）
    percentProgress: {
      type: [Number],
      default: 0,
    },
  },
  data() {
    return {
      move: {
        status: false, // 是否可拖动
        startX: 0, // 记录最开始点击的X坐标
        left: 0, // 记录当前已经移动的距离
      },
    };
  },

  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.move.status) {
        const barWidth = this.$refs.musicProgress.clientWidth - dotWidth;
        const offsetWidth = newPercent * barWidth;
        this.moveSilde(offsetWidth);
      }
    },
    //缓冲进度条
       percentProgress(newValue){
          let offsetWidth = this.$refs.musicProgress.clientWidth * newValue
         this.$refs.musicPercentProgress.style.width = `${offsetWidth}px`
    }
  },
  mounted() {
      this.$nextTick(() => {
    
      const barWidth = this.$refs.musicProgress.clientWidth - dotWidth
      const offsetWidth = this.percent * barWidth
      this.moveSilde(offsetWidth)
    })
  },
  methods: {
    barClick(e) {
        let rect = this.$refs.musicProgress.getBoundingClientRect()
      let offsetWidth = Math.min(
        this.$refs.musicProgress.clientWidth - dotWidth,
        Math.max(0, e.clientX - rect.left)
      )
      this.moveSilde(offsetWidth)
      this.commitPercent(true) //修改进度条
    },
    // 移动滑块
    moveSilde(offsetWidth) {
      this.$refs.musicProgressInner.style.width = `${offsetWidth}px`;
    },

        // 修改 percent
    commitPercent(isEnd = false) {
      const { musicProgress, musicProgressInner } = this.$refs
      const lineWidth = musicProgress.clientWidth - dotWidth
      const percent = musicProgressInner.clientWidth / lineWidth
      this.$emit(isEnd ? 'percentChangeEnd' : 'percentChange', percent)
    }
  },
};
</script>
<style lang="less">
.musicProgress {
  position: relative;
  padding: 5px;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  .musicProgress-bar {
    height: 2px;
    width: 100%;
    background: @bar_color;
  }
  .musicProgress-outer {
    position: absolute;
    top: 50%;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 2px;
    margin-top: -1px;
    background: rgba(8, 235, 8, 0.2);
  }
  .musicProgress-inner {
    position: absolute;
    top: 50%;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 2px;
    margin-top: -1px;
    background: @line_color;
    .musicProgress-dot {
      position: absolute;
      top: 50%;
      right: -5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: @dot_color;
      transform: translateY(-50%);
    }
  }
}
</style>