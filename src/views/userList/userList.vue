<template>
  <!--我的歌单-->
  <div class="userList">
    <template v-if="list.length > 0">
      <div
        v-for="item in formatList"
        :key="item.id"
        class="list-item"
        :title="item.name"
      >
        <router-link
          :to="{ path: `/music/details/${item.id}` }"
          tag="div"
          class="userList-item"
        >
          <img v-lazy="`${item.coverImgUrl}?param=200y200`" class="cover-img" />
          <h3 class="name">{{ item.name }}</h3>
        </router-link>
      </div>
    </template>
      <span>没有歌曲</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getUserPlaylist } from '@/axios/api'


export default {
  name: 'UserList',
  components: {
  },
  data() {
    return {
      list: [] // 列表
    }
  },

  computed: {
    formatList() {
      return this.list.filter(item => item.trackCount > 0)
    },
    ...mapGetters(['uid'])
  },
  watch: {
    uid(newUid) {
      if (newUid) {
        this._getUserPlaylist(newUid)
      } else {
        this.list = []
      }
    }
  },
  created() {
  },
  activated() {
    if (this.uid && this.list.length === 0) {
      this._getUserPlaylist(this.uid)
    } else if (!this.uid && this.list.length !== 0) {
      this.list = []
    }
  },
  methods: {
    // 获取我的歌单详情
    _getUserPlaylist(uid) {
      getUserPlaylist(uid).then(res => {
        if (res.playlist.length === 0) {
          return
        }
        this.list = res.playlist.slice(1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.userList {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &-head {
    height: 100px;
  }
  .list-item {
    float: left;
    width: calc(~'100% / 7');
    .userList-item {
      width: 130px;
      text-align: center;
      cursor: pointer;
      margin: 30px auto 20px;
      img{
        border-radius: 30%;
      }
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
}
</style>
