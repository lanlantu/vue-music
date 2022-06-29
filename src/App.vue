<template>
  <div id="app">
    <music-header />
    <router-view class="router-view"></router-view>

    <music-dialog1
      ref="versionDialog"
        type="alert"
      head-text="兰兰兔-小提示"
      :body-text="noticeInfo"
    
    />
    <!--播放器-->
    <audio ref="lanlantuPlayer"></audio>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import MusicHeader from "./components/music-header/music-header.vue";
import { NOTICE_INFO } from "@/utils/config";
import MusicDialog from './base/music-dialog/music-dialog.vue';

export default {
  name: "App",
  components: {
    MusicHeader,
    MusicDialog,XXXXXXX
  },
  computed: {},
  created() {
    this.noticeInfo = NOTICE_INFO;
      this.openDialog()
    // 设置audio元素
    // 
    
    // 
    this.$nextTick(() => { 
      this.setAudioEle(this.$refs.lanlantuPlayer);
    });
  },
// 13755035258
// 17828457105
  methods: {
    // ...mapMutations(['SET_AUDIOELE'])
    
    ...mapMutations({ 
      setAudioEle: "SET_AUDIOELE",
    }),

    openDialog(){
     setTimeout(() => {
     this.$refs.versionDialog.show();
     }, 150);

    }
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
