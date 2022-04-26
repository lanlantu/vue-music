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

    <!-- 底部播放器 -->
    <div class="music-bar">
      <div class="music-bar-btns">
        <music-icon
          class="pointer"
          type="Player-previous"
          :size="36"
          title="上一曲 Ctrl + Left"
           @click="prev"
        />
        <music-icon
          class="control-play pointer"
          :type="playing ? 'Playerpause1' : 'Playerstop' "
          :size="36"
          title="播放暂停 Ctrl + Space"
           @click="play"
        />
        <music-icon
          class="pointer"
          type="Playernext"
          :size="36"
          title="下一曲 Ctrl + Right"
           @click="next"
        />
      </div>
      <div class="music-music">
        <div class="music-bar-info">
          <template>欢迎使用mmPlayer在线音乐播放器</template>
        </div>
        <div v-if="false" class="music-bar-time">
          {{ currentTime | format }}/{{ currentMusic.duration % 3600 | format }}
        </div>
      </div>
      
    </div>

    <!--遮罩-->
    <div class="music-bg"></div>
    <div class="music-mask"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { silencePromise } from "@/utils/util";
import { getPlaylistDetail } from "@/axios/api";
import musicBtn from "@/components/music-btn/music-btn.vue";
import MusicIcon from "@/base/music-icon/music-icon.vue";
export default {
  components: { musicBtn, MusicIcon },
  name: "Music",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["audioEle", "playing", "currentMusic","currentIndex"]),
  },
  watch: {
    currentMusic(newMusic, oldMusic) {
      if (!newMusic.id) {
        return;
      }
      if (newMusic.id === oldMusic.id) {
        return;
      }
      this.audioEle.src = newMusic.url;
      //  silencePromise(this.audioEle.play())
      this.setPlaying(true);
    },
    playing(newPlaying) {
      const audio = this.audioEle;
      this.$nextTick(() => {
        newPlaying ? silencePromise(audio.play()) : audio.pause();
      });
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
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setIndex:'SET_CURRENTINDEX'
    }),

      prev(){

      },
      play() {
      // if (!this.musicReady) {
      //   return
      // }
      this.setPlaying(!this.playing)
    },
    next(){
      this.setIndex(this.currentIndex + 1)
       this.setPlaying(true)
    }
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

  .music-bar {
    width: 100%;
    height: 80px;
    border: 1px solid white;
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