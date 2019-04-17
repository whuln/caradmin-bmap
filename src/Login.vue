<template>
  <div>
    <div class="header">
      <img class="logoIcon" src="./assets/logo.png">
      <br>
      <span>车辆管理系统</span>
    </div>
    <div class="login">
      <mu-text-field v-model="user.account" icon="account_circle"></mu-text-field>
      <br>
      <mu-text-field v-model="user.password" icon="locked"></mu-text-field>
      <br>
    </div>
    <div class="footer">
      记住我
      <mu-switch style="margin-left:20px;" v-model="isRemember"></mu-switch>
      <br>
      <br>
      <mu-button style="width:20em" color="red" @click="handleLogin">登录</mu-button>
      <br>
      <br>
      <mu-button flat color="success" @click="toggleHostShow">服务器设置</mu-button>
      <br>
      <mu-text-field v-show="hostshow" v-model="newhost"></mu-text-field>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { setToken } from "@/libs/util";

import Toast from "muse-ui-toast";
export default {
  data() {
    return {
      isRemember: false,
      hostshow: false,
      newhost: "10.4.148.155:7001", //保存到localStorage
      user: {
        account: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapState(["rememberMe","r"]),   
  },
  watch: {
    isRemember(newVal, oldVal) {
      this.changeRememberMe(newVal);     
    },
    newhost(newVal, oldVal) {
      this.changeRequest(newVal);
    }
  },
  methods: {
    ...mapMutations(["changeRememberMe", "changeRequest"]),
    toggleHostShow() {
      this.hostshow = !this.hostshow;
    },
    async handleLogin() {
      // 获取并保存token, 来到login界面说明token已经失效
      //验证用户输入是否异常
      const _user = this.user;
      if (!_user.account) {
        Toast.error("用户账号不能为空");
        return;
      }
      if (!_user.password) {
        Toast.error("用户密码不能为空");
        return;
      }

      try {
        const resp = await this.r.post("login", _user);

        if(resp.data.code == 0){
          const token = resp.data.msg.token;
          setToken(token, this.rememberMe);
          this.$router.push("home");
        }else{
          Toast.error("登录错误：" + resp.data.msg);
          this.$router.push("/");
        }
        
      } catch (error) {
        Toast.error("登录错误：" + error);
        this.$router.push("/");
      }
     
    }
  }
};
</script>

<style lang="stylus" scoped>
.header {
  text-align: center;
  padding: 3em 1em 1em 1em;

  .logoIcon {
    width: 5em;
    height: 5em;
  }
}

.login {
  padding: 1em 1em 3em 1em;
}

.footer {
  text-align: center;
}
</style>
