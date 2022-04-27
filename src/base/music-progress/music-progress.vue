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
  },
  mounted() {
    const barWidth = this.$refs.musicProgress.clientWidth - dotWidth;
    console.log(barWidth);
  },
  watch: {
    percent(newPercent) {
      let width = newPercent * (this.$refs.musicProgress.clientWidth - dotWidth);
      this.moveSilde(width);
    },
  },
  methods: {
    barClick() {
      this.moveSilde(300);
    },
    // 移动滑块
    moveSilde(offsetWidth) {
       this.$refs.musicProgressInner.style.width = `${offsetWidth}px`
    },
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
    background: rgba(255, 255, 255, 0.2);
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