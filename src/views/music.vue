<template>
  <div class="music">
    <div class="music-content">
      <div class="music-left">
      <music-btn/>
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
      </div>
      <div class="music-right"></div>
    </div>

    <!--遮罩-->
    <div class="music-bg"></div>
    <div class="music-mask"></div>
  </div>
</template>

<script>
import musicBtn from '@/components/music-btn/music-btn.vue';
export default {
  components: { musicBtn },
  name: "Music",
  data() {
    return {};
  },
  computed: {},
};
</script>


<style lang="less">
.music {
  box-sizing: border-box;
  background-color: aliceblue;
  max-width: 1800px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .music-content {
    display: flex;
    width: 100%;
    height: 100%;
    height: calc(100% - 80px);
    .music-left {
      flex: 1;
      height: 100%;
      background-color: aqua;
    }
    .music-right {
      height: 100%;
      width: 300px;
      margin-left: 10px;

      background-color: chartreuse;
    }
  }

  /*遮罩*/
  .music-mask,
  .music-bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .music-mask {
    z-index: -1;
    background-color: @mask_color;
  }

  .music-bg {
    background-image: url(@/assets/background/4.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(2px);
    z-index: -2;
    opacity: 0.5;
    transition: all 0.8s;
    transform: scale(1.1);
  }
}
</style>