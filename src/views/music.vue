<template>
  <div class="music">
    我是music页面

    <!--遮罩-->
    <div class="music-bg"></div>
    <div class="music-mask"></div>
  </div>
</template>

<script>
export default {
  name: "Music",
  data() {
    return {};
  },
  computed: {},
};
</script>


<style lang="less">
.music {
  width: 100%;
  height: 100%;



  // 遮罩
  .music-bg,
  .music-mask{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

   .mmPlayer-mask {
    z-index: -1;
    background-color: @mask_color;
  }

  .music-bg {
    background-image: url(@/assets/background/4.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    opacity: 0.5;
    transition: all 2s;
     transform: scale(1.1);

  }
}
</style>