<template>
  <div class="playList">
    <music-list
      :list="playlist"
      @select="selectItem"
      @del="deleteItem"
    ></music-list>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import musicList from "@/components/music-list/music-list.vue";

export default {
  components: { musicList },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["playlist", "currentMusic"]),
  },
  created() {},
  methods: {
    ...mapMutations({
      setCurrentIndex: "SET_CURRENTINDEX",
      setPlaying: "SET_PLAYING",
    }),
    selectItem(item, index) {
      if (item.id !== this.currentMusic.id) {
        this.setCurrentIndex(index);
        this.setPlaying(true);
      }
    },
    deleteItem(index) {
      this,this.setPlaying(false)
    },
  },
};
</script>

<style lang="less">
.playList {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
