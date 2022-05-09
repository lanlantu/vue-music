<template>
  <!--搜索-->
  <div class="search">
    <MusicLoading v-model="LoadShow" />
    <div class="search-head">
      <span
        v-for="(item, index) in Artists"
        :key="index"
        @click="clickHot(item.first)"
      >
        {{ item.first }}
      </span>
      <input
        v-model.trim="searchValue"
        class="search-input"
        type="text"
        placeholder="请输入要查找的：音乐/歌手"
        @keyup.enter="onEnter"
      />
    </div>

    <div class="music-list">
      <music-list
        ref="musicList"
        :list="list"
        list-type="pullup"
        @select="selectItem"
        @pullUp="pullUpLoad"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { search, searchHot, getMusicDetail } from "@/axios/api";
import { formatSongs } from "@/utils/song";
import MusicList from "@/components/music-list/music-list";
import { toHttps } from "@/utils/util";
import MusicLoading from "@/base/music-loading/music-loading.vue";
import { loadMixin } from "@/utils/mixin";

export default {
  name: "Search",
  components: {
    MusicList,
    MusicLoading
},
  data() {
    return {
      searchValue: "", // 搜索关键词
      Artists: [], // 热搜数组
      list: [], // 搜索数组
      page: 0, // 分页
      lockUp: true, // 是否锁定上拉加载事件,默认锁定
    };
  },
  mixins:[loadMixin],
  computed: {
    ...mapGetters(["playing", "currentMusic"]),
  },
  watch: {
    list(newList, oldList) {
      if (newList.length !== oldList.length) {
        this.lockUp = false;
      } else if (
        newList[newList.length - 1].id !== oldList[oldList.length - 1].id
      ) {
        this.lockUp = false;
      }
    },
  },
  created() {
    // 获取热搜
    searchHot().then(({ result }) => {
      this.Artists = result.hots.slice(0, 5);
       this.LoadShow = false
    });
  },
  methods: {
    // 点击热搜
    clickHot(name) {
      this.searchValue = name;
      this.onEnter();
    },
    // 搜索事件
    onEnter() {
      if (this.searchValue.replace(/(^\s+)|(\s+$)/g, "") === "") {
        this.$musicMessage("搜索内容不能为空！");
        return;
      }
        this.LoadShow = true
      this.page = 0;
      if (this.list.length > 0) {
        this.$refs.musicList.scrollTo();
      }
      search(this.searchValue).then(({ result }) => {
        this.list = formatSongs(result.songs);
          this._hideLoad()
      });
    },
    // 滚动加载事件
    pullUpLoad() {
      this.page += 1;
      search(this.searchValue, this.page).then(({ result }) => {
        if (!result.songs) {
          this.$musicMessage("没有更多歌曲啦！");
          return;
        }
        this.list = [...this.list, ...formatSongs(result.songs)];
      });
    },
    // 播放歌曲
    async selectItem(music) {
      try {
        const image = await this._getMusicDetail(music.id);
        music.image = toHttps(image);
        // this.selectAddPlay(music)
      } catch (error) {
        this.$musicMessage("哎呀，出错啦~");
      }
    },
    // 获取歌曲详情
    _getMusicDetail(id) {
      return getMusicDetail(id).then((res) => res.songs[0].al.picUrl);
    },
    ...mapMutations({
      setPlaying: "SET_PLAYING",
    }),
    // ...mapActions(['selectAddPlay'])
  },
};
</script>

<style lang="less" scoped>
.search {
  position: relative;
  width: 100%;
  height: 100%;
  .search-head {
    box-sizing: content-box;
    display: flex;
    height: 40px;
    padding: 10px 15px;
    overflow: hidden;
    background: @search_bg_coloe;
    span {
      line-height: 40px;
      margin-right: 15px;
      cursor: pointer;
      &:hover {
        color: @text_color_active;
      }
      @media (max-width: 640px) {
        & {
          display: none;
        }
      }
    }
    .search-input {
      flex: 1;
      height: 40px;
      box-sizing: border-box;
      padding: 0 15px;
      border: 1px solid @btn_color;
      outline: 0;
      background: transparent;
      color: @text_color_active;
      font-size: @font_size_medium;
      box-shadow: 0 0 1px 0 #fff inset;
      &::placeholder {
        color: @text_color;
      }
    }
  }
  .music-list {
    width: 100%;
    height: calc(~"100% - 50px");
  }
}
</style>
