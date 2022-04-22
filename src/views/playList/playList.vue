<template>
  <div class="playList">
      <music-list></music-list>
  </div>
</template>

<script>
import musicList from '@/components/music-list/music-list.vue';

export default {
  components: { musicList },
  data() {
    return {
      list: [],
    };
  },
  created() {
   
  
  },
};
</script>

<style lang="less" scoped>
.playList {
  width: 100%;
  height: calc(100% - 60px);

}
</style>
