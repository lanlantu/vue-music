<template>
  <!--弹出层提示-->
  <transition name="message-fade" >
    <div v-show="visible" class="music-message" :class="positionClasss">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "MusicMessage",
  data() {
    return {
      position: "center", // 默认显示位置
      message: "哈哈哈", // 默认显示文本
      duration: 1500, // 显示时间, 毫秒
      visible: false, // 是否显示
    };
  },
  computed: {
    positionClasss() {
      return "music-message-" + this.position;
    },
  },

};
</script>

<style lang="less">
@prefix-cls: music-message;

.@{prefix-cls} {
  background-color: red;
  position: fixed;
  left: 50%;
  z-index: 20;
  max-width: 80%;
  border-radius: 5px;
  padding: 10px 20px;
  overflow: hidden;
  text-align: center;
  min-height: 40px;
  line-height: 20px;
  font-size: 14px;
  color: #fff;
  user-select: none;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);

  &&-top {
    top: 10%;
  }
  &&-center {
    top: 50%;
    margin-top: -20px;
  }
  &&-bottom {
    bottom: 10%;
  }
}
</style>
