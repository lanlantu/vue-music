<template>
  <!--歌单详情-->
  <div class="details">
    <music-list :list="list" @select="selectItem" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getPlaylistDetail } from '@/axios/api'
import MusicList from '@/components/music-list/music-list'

export default {
  name: 'Detail',
  components: {
    MusicList
  },
  data() {
    return {
      list: [] // 列表
    }
  },
  created() {
    // 获取歌单详情
    getPlaylistDetail(this.$route.params.id)
      .then(playlist => {
        document.title = `${playlist.name} - 兰兰兔在线音乐播放器`
        this.list = playlist.tracks
      })
      .catch(() => {
      })
  },
  methods: {
    // 播放暂停事件
    selectItem(item, index) {
      this.selectPlay({
        list: this.list,
        index
      })
    },
    ...mapActions(['selectPlay'])
  }
}
</script>

<style lang="less" scoped>
.details {
  position: relative;
  width: 100%;
  height: 100%;
 
}
</style>
