<template>
  <div class="music">
    <div class="music-content">
      <div class="music-left">
        <music-btn />
        <keep-alive>
          <router-view class="music-list" />
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
import { mapActions, mapGetters } from "vuex";
import { getPlaylistDetail } from "@/axios/api";
import musicBtn from "@/components/music-btn/music-btn.vue";
export default {
  components: { musicBtn },
  name: "Music",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["audioEle", "playing", "currentMusic"]),
  },
  watch: {
    currentMusic(newMusic, oldMusic) {
      console.log(newMusic);
      console.log(oldMusic);
      if (!newMusic.id) {
        console.log("我被返回了");
        return;
      }
      if (newMusic.id === oldMusic.id) {
        return;
      }
      this.audioEle.src = newMusic.url;
      this.audioEle.play()
    },
  },
  created() {
    const defaultSheetId = 3778678;
    getPlaylistDetail(defaultSheetId).then((playlist) => {
      this.list = playlist.tracks.slice(0, 100);
      this.setPlaylist(playlist.tracks.slice(0, 100));
    });
  },
  methods: {
    ...mapActions(["setPlaylist"]),
  },
};
</script>


<style lang="less">
.music {
  padding: 75px 25px 25px 25px;
  box-sizing: border-box;
  max-width: 1750px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .music-content {
    display: flex;
    width: 100%;
    height: calc(~"100% - 80px");
    .music-left {
      flex: 1;
      height: 100%;
      .music-list {
        height: calc(~"100% - 60px");
      }
    }
    .music-right {
      background-color: greenyellow;
      height: 100%;
      width: 300px;
      margin-left: 10px;
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