<template>
  <div class="home">
    <mu-appbar class="header" color="red">
      <mu-menu slot="right" placement="bottom-end" open-on-hover>
        <mu-icon value="menu"></mu-icon>
        <div dense slot="content">
          <mu-button color="secondary" @click="handleLogout">退出</mu-button>
        </div>
      </mu-menu>车辆管理系统
    </mu-appbar>

    <div class="content">
      <img src="../assets/images/car.jpg" style="width:100%;">
      <mu-flex wrap="wrap" justify-content="start">
        <div @click="handleMyUse" class="grid-cell" v-if="accesses.includes(2)">
          <span class="icon-button iconfont icon-shenqing"></span>
          <div>我的用车</div>
        </div>
        <div @click="handleMyApprove" class="grid-cell" v-if="accesses.includes(3)">
          <span class="icon-button iconfont icon-shenpi"></span>
          <div>我的审批</div>
        </div>

        <!-- <div class="grid-cell">
          <span class="icon-button iconfont icon-pingjia"></span>
          <div>用车评价</div>
        </div>-->

        <div @click="handleMyTask" class="grid-cell" v-if="accesses.includes(4)">
          <span class="icon-button iconfont icon-renwu"></span>
          <div>我的任务</div>
        </div>
        <div @click="handleMyDispatch" class="grid-cell" v-if="accesses.includes(5)">
          <span class="icon-button iconfont icon-ditu"></span>
          <div>我的调度</div>
        </div>
        <div @click="handleAllCaruse" class="grid-cell" v-if="accesses.includes(8)">
          <img class="img-button" src="../assets/images/menu/allcarapply.png">
          <div>所有用车</div>
        </div>
        <div @click="handleSummary" class="grid-cell" v-if="accesses.includes(9)">
          <img class="img-button" src="../assets/images/menu/approve.png">
          <div>汇总统计</div>
        </div>
        <div @click="handleUserManage" class="grid-cell" v-if="accesses.includes(6)">
          <img class="img-button" src="../assets/images/menu/pj.png">
          <div>人员管理</div>
        </div>
        <div @click="handleCarManage" class="grid-cell" v-if="accesses.includes(7)">
          <img class="img-button" src="../assets/images/menu/carmanage.png">
          <div>车辆管理</div>
        </div>
      </mu-flex>
    </div>
    <div class="footer">
      <div v-if="accesses.includes(1)">
        <img
          @click="handleCarApply"
          src="../assets/images/menu/carapply.png"
          style="border-radius: 25px;width:50px;background:white;position:relative;margin-top:-25px;"
        >
        <br>
        <span style="color:white;">申请用车</span>
      </div>
    </div>
  </div>
</template>

<script>
import { logOut } from "@/libs/util.js";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "home",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["userinfo"]),
    ...mapGetters(["accesses"])
  },
  watch: {},
  methods: {
    handleMyUse() {
      this.$router.push("my-use");
    },
    handleMyApprove() {
      this.$router.push("my-approve");
    },
    handleMyTask() {
      this.$router.push("my-task");
    },
    handleMyDispatch() {
      this.$router.push("my-dispatch");
    },
    handleMyDispatch() {
      this.$router.push("my-dispatch");
    },
    handleUserManage() {
      this.$router.push("user-manage");
    },
    handleCarManage() {
      this.$router.push("car-manage");
    },
    handleAllCaruse() {
      this.$router.push("all-caruse");
    },
    handleSummary() {
      this.$router.push("summary");
    },
    handleCarApply() {
      this.$router.push("car-apply");
    },
    handleLogout() {
      logOut(this.$router);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import url('../assets/css/iconfont.css');

.home {
  display: flex;
  height: 100%;
  flex-direction: column;

  .header {
    width: 100%;
    flex: 0 0 30px;
  }

  .content {
    flex: 1 1 auto;

    .icon-btn-box {
    }

    .grid-cell {
      width: 33.3%;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid silver;
      border: 1px solid silver;
    }

    .icon-button {
      font-size: 40px;
      color: #f23622;
    }

    .img-button {
      width: 53px;
    }
  }

  .footer {
    flex: 0 0 30px;
    background: #f23622;
    text-align: center;
  }
}
</style>
