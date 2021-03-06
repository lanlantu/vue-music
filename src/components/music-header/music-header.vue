<template>
  <!--头部-->
  <header class="music-header">
    <h1 class="header">
      <a href="#" target="_blank"> 兰兰兔-在线音乐播放器 </a>
    </h1>
    <dl class="user">
      <template v-if="user.userId">
        <router-link class="user-info" to="/music/userlist" tag="dt">
          <img class="avatar" :src="`${user.avatarUrl}?param=50y50`" />
          <span>{{ user.nickname }}</span>
        </router-link>
        <dd class="user-btn" @click="openDialog(2)">退出</dd>
      </template>
      <dd v-else class="user-btn" @click="openDialog(0)">登录</dd>
    </dl>
    <!--登录-->
    <music-dialog
      ref="loginDialog"
      head-text="登录"
      confirm-btn-text="登录"
      cancel-btn-text="关闭"
      @confirm="login"
    >
      <div class="music-dialog-text">
        <input
          v-model.trim="uidValue"
          class="music-dialog-input"
          type="number"
          autofocus
          placeholder="请输入您的网易云 UID"
          @keyup.enter="login"
        />
      </div>

      <div slot="btn" @click="openDialog(1)">帮助</div>
      <div slot="qqlogin" @click="toLogin(1)">
        <img src="@/assets/img/qqlogin_24X24.png" alt="" />
      </div>
      <div slot="weibologin" @click="toLogin(2)">
          <img src="@/assets/img/weibo.jpg" alt="" />
      </div>
    </music-dialog>
    <!--帮助-->
    <music-dialog
      ref="helpDialog"
      head-text="登录帮助"
      confirm-btn-text="去登录"
      cancel-btn-text="关闭"
      @confirm="openDialog(0)"
    >
      <div class="music-dialog-text">
        <p>
          1、
          <a target="_blank" href="https://music.163.com">
            点我(https://music.163.com)
          </a>
          打开网易云音乐官网
        </p>
        <p>2、点击页面右上角的“登录”</p>
        <p>3、点击您的头像，进入我的主页</p>
        <p>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</p>
      </div>
    </music-dialog>
    <!--退出-->
    <music-dialog
      ref="outDialog"
      body-text="确定退出当前用户吗？"
      @confirm="out"
    />
  </header>
</template>

<script>
import { getUserPlaylist } from "@/axios/api";
import { mapGetters, mapActions } from "vuex";
import { toHttps } from "@/utils/util";
import MusicDialog from "@/base/music-dialog/music-dialog.vue";

export default {
  name: "MusicHeader",
  components: {
    MusicDialog,
  },
  data() {
    return {
      user: {}, // 用户数据
      uidValue: "", // 记录用户 UID
    };
  },
  computed: {
    ...mapGetters(["uid"]),
  },
  created() {
    this.uid && this._getUserPlaylist(this.uid);
  },
  methods: {
    // 打开对话框
    openDialog(key) {
      switch (key) {
        case 0:
          this.$refs.loginDialog.show();
          break;
        case 1:
          this.$refs.loginDialog.hide();
          this.$refs.helpDialog.show();
          break;
        case 2:
          this.$refs.outDialog.show();
          break;
        case 3:
          this.$refs.loginDialog.hide();
          break;
      }
    },
    // 退出登录
    out() {
      this.user = {};
      this.setUid(null);
      this.$musicMessage("退出成功！");
    },
    // 登录
    login() {
      if (this.uidValue === "") {
        this.$musicMessage("UID 不能为空");
        this.openDialog(0);
        return;
      }
      this.openDialog(3);
      this._getUserPlaylist(this.uidValue);
    },
    // 获取用户数据
    _getUserPlaylist(uid) {
      getUserPlaylist(uid).then(({ playlist = [] }) => {
        this.uidValue = "";
        if (playlist.length === 0 || !playlist[0].creator) {
          this.$musicMessage(`未查询找 UID 为 ${uid} 的用户信息`);
          return;
        }
        const creator = playlist[0].creator;
        this.setUid(uid);
        creator.avatarUrl = toHttps(creator.avatarUrl);
        this.user = creator;
        setTimeout(() => {
          this.$musicMessage(
            `${this.user.nickname} 欢迎使用 兰兰兔-在线音乐播放器`
          );
        }, 200);
      });
    },
    toLogin(number) {
      let url;
      if (number == 1) {
        url =
          "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=102009968&redirect_uri=https://im.qq.com/index&scope=scope&display=display";
      }
      if (number == 2) {
         url =
          "https://api.weibo.com/oauth2/authorize?client_id=3459360514&response_type=code&redirect_uri=http://lanlantu.cn/";
      }

      window.open(url, "_self");
    },
    ...mapActions(["setUid"]),
  },
};
</script>

<style lang="less">
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
    @media (max-width: 768px) {
      padding-left: 15px;
      text-align: left;
    }
  }
  .user {
    position: absolute;
    top: 50%;
    right: 15px;
    line-height: 30px;
    text-align: right;
    transform: translateY(-50%);
    &-info {
      float: left;
      margin-right: 15px;
      cursor: pointer;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 90px;
        vertical-align: middle;
      }
      span {
        margin-left: 10px;
        color: @text_color_active;
      }
    }
    &-btn {
      float: left;
      cursor: pointer;
      &:hover {
        color: @text_color_active;
      }
    }
    @media (max-width: 768px) {
      &-info {
        margin-right: 10px;
        span {
          display: none;
        }
      }
    }
  }
}
.music-dialog-text {
  text-align: left;
  .music-dialog-input {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0 15px;
    border: 1px solid @btn_color;
    outline: 0;
    background: transparent;
    color: @text_color_active;
    font-size: @font_size_medium;
    box-shadow: 0 0 1px 0 #fff inset;
    &::placeholder {
      color: @text_color;
    }
  }
  a:hover {
    color: #d43c33;
  }
}
</style>


