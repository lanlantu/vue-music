<template>
  <div id="app">
    <music-header />
    <router-view class="router-view"></router-view>

    <!--播放器-->
    <audio ref="lanlantuPlayer"></audio>
  </div>
</template>

<script>
import {mapMutations,mapGetters} from 'vuex'
import MusicHeader from "./components/music-header/music-header.vue";

export default {
  name: "App",
  components: {
    MusicHeader,
  },
  computed: {
  },
  created() {
       // 设置audio元素
    this.$nextTick(() => {
      this.setAudioEle(this.$refs.lanlantuPlayer)
    })
  },
  methods: {
    // ...mapMutations(['SET_AUDIOELE'])
    ...mapMutations({
      setAudioEle:'SET_AUDIOELE'
    })
  },
};
</script>

<style lang="less">
#app {
  position: relative;
  height: 100%;
  width: 100%;
    color: @text_color;
  font-size: @font_size_medium;
  .router-view {
    width: 100%;
    height: 100%;
  }

  audio {
    position: fixed;
  }
}
</style>
