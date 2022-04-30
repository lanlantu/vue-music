<template>
  <div>search页面
      <music-progress/>
      <music-message/>
  </div>

</template>

<script>
import musicProgress from '@/base/music-progress/music-progress.vue'
import MusicMessage from '@/base/music-message/music-message.vue'
export default {
  components: { musicProgress, MusicMessage },

}
</script>


