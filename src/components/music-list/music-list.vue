<template>
  <div class="mucisList">
    <template v-if="list.length > 0">
      <div class="list-item list-header">
        <span class="list-name">歌曲</span>
        <span class="list-artist">歌手</span>
        <span class="list-time">时长</span>
      </div>
      <div ref="listContent" class="list-content">
        <div
          v-for="(item, index) in list"
          :key="item.id"
          class="list-item"
          @dblclick="selectItem(item, index, $event)"
        >
          <span class="list-num">{{ index + 1 }}</span>
          <div class="list-name">
            <span>{{ item.name }}</span>
            <div class="list-menu">
              <music-icon
                class="hover"
                type="play-mini"
                :size="40"
                @click.stop="selectItem(item, index)"
              />
            </div>
          </div>

          <span class="list-artist">{{ item.singer }}</span>
          <span v-if="true" class="list-time">
            {{ item.duration % 3600 | format }}
            <music-icon
              class="hover list-menu-icon-del"
              type="delete-mini"
              :size="40"
              @click.stop="deleteItem(index)"
            />
          </span>
          <span v-else class="list-album">{{ item.album }}</span>
        </div>
      </div>
    </template>
    <div v-else>什么也没有</div>
  </div>
</template>

<script>
import { getPlaylistDetail } from "@/axios/api";
import { format } from "@/utils/util";
import musicIcon from "@/base/music-icon/music-icon.vue";
export default {
  components: { musicIcon },
  data() {
    return {
      list: [],
    };
  },
  filters: {
    format,
  },
  created() {
    const defaultSheetId = 3778678;
    getPlaylistDetail(defaultSheetId).then((playlist) => {
      this.list = playlist.tracks.slice(0, 100);
    });
  },
  methods: {
    selectItem(item, index) {
      console.log(item);
      console.log(index);
    },
    deleteItem() {
      console.log("delete");
    },
  },
};
</script>

<style lang="less" scoped>
.mucisList {
  width: 100%;
  height: 100%;
  .list-item.list-header {
    height: 60px;
    width: 100%;
    border-bottom: 1px solid @list_head_line_color;
    color: @text_color_active;

    .list-name {
      padding-left: 40px;
      user-select: none;
    }
    .list-artist{
      user-select: none;
    }
    .list-album{
       user-select: none;
      margin-right: 20px;
    }
    .list-time{
      user-select: none;
      margin-right: 20px;
  }
  }
  .list-content {
    width: 100%;
    height: calc(100% - 60px);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .list-item {
    background-color: plum;
    display: flex;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid @list_item_line_color;
    line-height: 50px;
    &:not([class*='list-header']):hover {
      color: aliceblue;
      .list-name .list-menu {
        display: block;
      }
      .list-time {
        font-size: 0;

        .list-menu-icon-del {
          display: block;
        }
      }
    }
    .list-num {
      width: 30px;
      margin-right: 10px;
      text-align: center;
    }
    .list-name {
      position: relative;
      flex: 1;
      background-color: aqua;
      & > span {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .list-menu {
        display: none;
        position: absolute;
        top: 50%;
        right: 10px;
        height: 40px;
        transform: translateY(-50%);
      }
    }

    .list-artist,
    .list-album {
      display: block;
      width: 300px;
      background-color: red;
    }

    .list-time {
      display: block;
      width: 80px;
      position: relative;

      .list-menu-icon-del {
        display: none;
        position: absolute;
        top: 50%;
        height: 40px;
        left: 0;
        transform: translateY(-50%);
      }
    }
  }
}
</style>