<template>
  <!--排行榜-->
  <div class="topList">
      <div class="topList-head">云音乐特色榜</div>
      <div class="topList-content">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="list-item"
          :title="`${item.name}-${item.updateFrequency}`"
        >
          <router-link
            :to="{ path: `/music/details/${item.id}` }"
            tag="div"
            class="topList-item"
          >
            <div class="topList-img">
              <img
                v-lazy="`${item.coverImgUrl}?param=300y300`"
                class="cover-img"
              />
            </div>
            <h3 class="name">{{ item.name }}</h3>
          </router-link>
        </div>
      </div>
      <div class="topList-head">热门歌单</div>
      <div class="topList-content">
        <div
          v-for="(item, index) in hotList"
          :key="index"
          class="list-item"
          :title="item.name"
        >
          <router-link
            :to="{ path: `/music/details/${item.id}` }"
            tag="div"
            class="topList-item"
          >
            <div class="topList-img">
              <img v-lazy="`${item.picUrl}?param=300y300`" class="cover-img" />
            </div>
            <h3 class="name">{{ item.name }}</h3>
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
import { getToplistDetail, getPersonalized } from '@/axios/api'

export default {
  name: 'PlayList',
  components: {
  },
  data() {
    return {
      list: [], // 云音乐特色榜
      hotList: [] // 热门歌单
    }
  },
  created() {
    Promise.all([getToplistDetail(), getPersonalized()])
      .then(([topList, hotList]) => {
        this.list = topList.list.filter(v => v.ToplistType)
        this.hotList = hotList.result.slice()
        this._hideLoad()
      })
      .catch(() => {})
  }
}
</script>

<style lang="less" scoped>
.topList {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &-head {
  box-sizing: content-box;
    width: 100%;
    height: 34px;
    line-height: 34px;
    padding: 20px 0;
    font-size: @font_size_large;
    color: @text_color_active;
  }
  &-content {
    overflow: hidden;
  }
  .list-item {
    float: left;
    width: calc(~'100% / 7');
    .topList-item {
      width: 130px;
      text-align: center;
      cursor: pointer;
      margin: 0 auto 20px;
      &:hover {
        color: #fff;
      }
      .name {
        height: 30px;
        line-height: 30px;
        font-size: @font_size_medium;
        .no-wrap();
      }
      @media (max-width: 1100px) {
        width: 80%;
      }
    }
  
 
  }

  img{
    border-radius: 30%;
  }
}
</style>
