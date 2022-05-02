<template>
  <div class="music">
    <div class="music-content">
      <div class="music-left">
        <music-btn />
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="music-list" />
        </keep-alive>
        <!-- 不设置key当在子路由来回切换时，会导致页面不刷新的问题，这是因为不再执行created和mounted这些钩子函数 -->
        <router-view
          v-if="!$route.meta.keepAlive"
          :key="$route.path"
          class="music-list"
        />
      </div>
      <div class="music-right">
        <lyric
          ref="lyric"
          :lyric="lyric"
          :nolyric="nolyric"
          :lyric-index="lyricIndex"
        />
      </div>
    </div>

    <!-- 底部播放器 -->
    <div
      class="music-bar"
      :class="{ disable: !musicReady || !currentMusic.id }"
    >
      <div class="music-bar-btns">
        <music-icon
          class="pointer"
          type="prev"
          :size="36"
          title="上一曲 Ctrl + Left"
          @click="prev"
        />

        <div
          class="control-play pointer"
          title="播放暂停 Ctrl + Space"
          @click="play"
        >
          <music-icon
            class="bofang"
            :type="playing ? 'pause' : 'play'"
            :size="36"
          />
        </div>
        <music-icon
          class="pointer"
          type="next"
          :size="36"
          title="下一曲 Ctrl + Right"
          @click="next"
        />
      </div>
      <div class="smallImage">
        <img :src="musicPicUrl" alt="" />
      </div>
      <div class="music-music">
        <div class="music-bar-info">
          <template v-if="currentMusic && currentMusic.id">
            {{ currentMusic.name }}
            <span>- {{ currentMusic.singer }}</span>
          </template>
          <template v-else>欢迎使用lanlantu在线音乐播放器</template>
        </div>
        <div v-if="currentMusic.id" class="music-bar-time">
          {{ currentTime | format }}/{{ currentMusic.duration % 3600 | format }}
        </div>
        <music-progress
          class="music-progress"
          :percent="percentMusic"
          :percentProgress="currentProgress"
          @percentChange="progressMusic"
          @percentChangeEnd="progressMusicEnd"
        />
      </div>
      <!-- 播放模式 -->
      <music-icon
        class="icon-color pointer mode"
        :type="getModeIconType()"
        :title="getModeIconTitle()"
        :size="30"
      />

      <!-- 评论 -->
      <music-icon
        class="icon-color pointer comment"
        type="comment"
        :size="30"
        @click="openComment"
      />

      <!-- 音量控制 -->
      <div class="music-bar-volume" title="音量加减 [Ctrl + Up / Down]">
        <volume :volume="volume" @volumeChange="volumeChange" />
      </div>
    </div>

    <!--遮罩-->
    <div class="music-bg" :style="{ backgroundImage: picUrl }"></div>
    <div class="music-mask"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import {
  silencePromise,
  format,
  randomSortArray,
  parseLyric,
} from "@/utils/util";
import { defaultBG, playMode } from "@/utils/config";
import { setVolume, getVolume } from "@/utils/storage";
import lanlantuPlayerMusic from "./lanlantuPlayer";
import { getPlaylistDetail, getLyric } from "@/axios/api";
import musicBtn from "@/components/music-btn/music-btn.vue";
import MusicIcon from "@/base/music-icon/music-icon.vue";
import MusicProgress from "@/base/music-progress/music-progress.vue";
import Volume from "@/base/volume/volume.vue";
import Lyric from "@/components/lyric/lyric.vue";
export default {
  components: { musicBtn, MusicIcon, MusicProgress, Volume, Lyric },
  name: "Music",
  data() {
    return {
      musicReady: false, // 是否可以使用播放器
      currentTime: 0, // 当前播放时间
      currentProgress: 0, // 当前缓冲进度
      isMute: false, // 是否静音
      volume: 1, // 音量大小

      lyric: [], // 歌词
      nolyric: false, // 是否有歌词
      lyricIndex: 0, // 当前播放歌词下标
    };
  },
  filters: {
    format,
  },
  computed: {
    ...mapGetters([
      "audioEle",
      "playing",
      "currentMusic",
      "currentIndex",
      "playlist",
      "mode",
      "orderList",
    ]),

    picUrl() {
      return this.currentMusic.id && this.currentMusic.image
        ? `url(${this.currentMusic.image}?param=300y300)`
        : `url(${defaultBG})`;
    },
    percentMusic() {
      return this.currentTime / this.currentMusic.duration;
    },
    musicPicUrl() {
      return this.currentMusic.id && this.currentMusic.image
        ? `${this.currentMusic.image}?param=50y50`
        : require("@/assets/img/default.png");
    },
  },
  watch: {
    currentMusic(newMusic, oldMusic) {
      if (!newMusic.id) {
        this.lyric = [];
        return;
      }
      if (newMusic.id === oldMusic.id) {
        return;
      }
      this.audioEle.src = newMusic.url;
      // 重置相关参数
      this.lyricIndex = this.currentTime = this.currentProgress = 0;
      silencePromise(this.audioEle.play());
      this.$nextTick(() => {
        this._getLyric(newMusic.id);
      });
    },
    playing(newPlaying) {
      const audio = this.audioEle;
      this.$nextTick(() => {
        newPlaying ? silencePromise(audio.play()) : audio.pause();
        this.musicReady = true;
      });
    },
    currentTime(newTime) {
      if (this.nolyric) {
        return;
      }
      let lyricIndex = 0;
      for (let i = 0; i < this.lyric.length; i++) {
        if (newTime > this.lyric[i].time) {
          lyricIndex = i;
        }
      }
      this.lyricIndex = lyricIndex;
    },
  },
  created() {
    const defaultSheetId = 3778678;
    getPlaylistDetail(defaultSheetId).then((playlist) => {
      this.list = playlist.tracks.slice(0, 100);
      this.setPlaylist(playlist.tracks.slice(0, 100));
    });
  },
  mounted() {
    this.$nextTick(() => {
      lanlantuPlayerMusic.initAudio(this);
      this.volume = getVolume();
      this.volumeChange(this.volume);
    });
  },
  methods: {
    ...mapActions(["setPlaylist", "setPlayMode"]),
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX",
    }),

    prev() {
      if (!this.musicReady) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex - 1;
        if (index < 0) {
          index = this.playlist.length - 1;
        }
        this.setCurrentIndex(index);
        if (!this.playing && this.musicReady) {
          this.setPlaying(true);
        }
        this.musicReady = false;
      }
    },
    play() {
      if (!this.musicReady) {
        return;
      }
      this.setPlaying(!this.playing);
    },
    // 下一曲
    // 当 flag 为 true 时，表示上一曲播放失败
    next(flag = false) {
      if (!this.musicReady) {
        return;
      }
      const {
        playlist: { length },
      } = this;
      if (length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex + 1;
        if (index === length) {
          index = 0;
        }
        if (!this.playing && this.musicReady) {
          this.setPlaying(true);
        }
        this.setCurrentIndex(index);
        this.musicReady = false;
      }
    },

    // 修改音乐显示时长
    progressMusic(percent) {
      this.currentTime = this.currentMusic.duration * percent;
    },
    //音乐进度条||等钱音乐播放时间
    progressMusicEnd(percent) {
      this.audioEle.currentTime = percent * this.currentMusic.duration;
    },
    // 循环
    loop() {
      this.audioEle.currentTime = 0;
      silencePromise(this.audioEle.play());
      this.setPlaying(true);
      if (this.lyric.length > 0) {
        this.lyricIndex = 0;
      }
    },

    //修改音量大小
    volumeChange(percent) {
      percent = Number(percent.toFixed(2)); //处理小数点位数过多导致浏览器报错
      percent === 0 ? (this.isMute = true) : (this.isMute = false);
      this.volume = percent;
      this.audioEle.volume = percent;
      setVolume(percent);
    },

    // 切换播放顺序
    modeChange() {
      const mode = (this.mode + 1) % 4;
      this.setPlayMode(mode);
      if (mode === playMode.loop) {
        return;
      }
      let list = [];
      switch (mode) {
        case playMode.listLoop:
        case playMode.order:
          list = this.orderList;
          break;
        case playMode.random:
          list = randomSortArray(this.orderList);
          break;
      }
      this.resetCurrentIndex(list);
      this.setPlaylist(list);
    },
    // 修改当前歌曲索引
    resetCurrentIndex(list) {
      const index = list.findIndex((item) => {
        return item.id === this.currentMusic.id;
      });
      this.setCurrentIndex(index);
    },
    // 获取播放模式 icon
    getModeIconType() {
      return {
        [playMode.listLoop]: "loop",
        [playMode.order]: "sequence",
        [playMode.random]: "random",
        [playMode.loop]: "loop-one",
      }[this.mode];
    },

    // 获取播放模式 title
    getModeIconTitle() {
      const key = "Ctrl + O";
      return {
        [playMode.listLoop]: `列表循环 ${key}`,
        [playMode.order]: `顺序播放 ${key}`,
        [playMode.random]: `随机播放 ${key}`,
        [playMode.loop]: `单曲循环 ${key}`,
      }[this.mode];
    },
    // 获取歌词
    _getLyric(id) {
      getLyric(id).then((res) => {
        if (res.nolyric) {
          this.nolyric = true;
        } else {
          this.nolyric = false;
          this.lyric = parseLyric(res.lrc.lyric);
        }
        silencePromise(this.audioEle.play());
      });
    },
    // 打开音乐评论
    openComment() {
      if (!this.currentMusic.id) {
        this.$musicMessage("还没有播放歌曲哦！");
        return false;
      }
      this.$router.push(`/music/comment/${this.currentMusic.id}`);
    },
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
      position: relative;
      width: 310px;
      margin-left: 10px;
    }
  }

  .music-bar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    color: #fff;

    &.disable {
      pointer-events: none;
      opacity: 0.6;
    }
    .music-bar-btns {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 180px;
      .control-play {
        .flex-center;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.3);
      }
    }

    .smallImage {
      width: 50px;
      height: 50px;
      margin-left: 40px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 30px;
      }
    }

    .music-music {
      position: relative;
      width: 100%;
      flex: 1;
      padding-left: 10px;
      font-size: @font_size_small;
      color: @text_color_active;
      .music-bar-info {
        height: 15px;
        padding-right: 80px;
        line-height: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .music-bar-time {
        position: absolute;
        top: 0;
        right: 5px;
      }
    }

    .mode,
    .comment,
    .music-bar-volume {
      margin-left: 20px;
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
    background-image: url(@/assets/background/background.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(2px);
    z-index: -2;
    opacity: 0.5;
    transition: all 0.8s;
    transform: scale(1);
  }
}
</style>