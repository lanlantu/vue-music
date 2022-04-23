<template>
  <header class="music-header">
    <h1 class="header">
      <a href="#" target="_blank"> 兰兰兔-网易云 在线音乐播放器 </a>
    </h1>
    <dl class="user"></dl>
  </header>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.music-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  @media (max-width: 768px) {
    background: @header_bg_color;
  }
  .header{
    text-align: center;
    line-height: 60px;
    color: @text_color_active;
    font-size: @font_size_large;
  }
}
</style>