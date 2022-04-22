<template>
  <div class="music-btn">
    <router-link to="/music/playlist" tag="span">正在播放</router-link>
    <router-link to="/music/discoverylist" tag="span">发现音乐</router-link>
    <router-link to="/music/search" tag="span">搜索</router-link>
    <router-link to="/music/userlist" tag="span">用户歌单</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.music-btn {
  width: 100%;
  height: 60px;
  background-color: antiquewhite;
  span {
    display: inline-block;
    box-sizing: border-box;
    padding: 0 20px;
    margin-left: 10px;
    margin-top: 10px;
    height: 40px;
    border: 1px solid @btn_color;
    line-height: 40px;
    color: @btn_color;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
     &:hover,
    &.active {
      border-color: @btn_color_active;
      color: @btn_color_active;
    }
  }
}
</style>