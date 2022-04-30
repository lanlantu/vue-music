<template>
  <header class="music-header">
    <h1 class="header">
      <a href="https://github.com/lanlantu" target="_blank">
        兰兰兔-在线音乐播放器
      </a>
    </h1>
    <dl class="user" @click="login">登陆</dl>
  </header>
</template>

<script>
export default {
  methods: {
    login(){
      this.$musicMessage("我是登陆弹窗")
    }
  },
};
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
  .header {
    text-align: center;
    line-height: 60px;
    color: @text_color_active;
    font-size: @font_size_large;
  }

  .user {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top:50%;
    transform: translateY(-50%);
  }
}
</style>