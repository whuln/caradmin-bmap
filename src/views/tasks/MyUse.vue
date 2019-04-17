<template>
  <div class="main">
    <task-header>我的用车</task-header>
    <div class="tablecon">
      <!-- <div v-for="i in [1,1,1,1,1,1,1,11,1,1,11,1,1,1,1,1,1,11,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1]">sds</div> -->
      <div v-if="!caruse">您当前没有用车</div>
      <div v-else>
        <!-- 您当前用车信息如下： -->       
          <mu-sub-header>基本信息</mu-sub-header>
          <div>用车人：{{caruse.user.name}}</div>
          <div>项目 ：{{caruse.project}}</div>
          <div>用途：{{caruse.purpose}}</div>
          <div>地点：{{caruse.places}}</div>
          <div>计划出发日期：{{caruse.plantime1}}</div>
          <div>计划回程日期：{{caruse.plantime2}}</div>
          <mu-sub-header>审核信息</mu-sub-header>
          <div>部门主任：{{caruse.isdmagree ? "已批准":"未批准"}}</div>
          <div v-if="caruse.isshengwai">主管领导：{{caruse.yldagree ? "已批准":"未批准"}}（省外）</div>
          <mu-sub-header>分配信息</mu-sub-header>
          <div>车辆：{{caruse.carnumber}}</div>
          <div>司机：{{caruse.driver?caruse.driver.name:""}}(电话：{{caruse.driver?caruse.driver.phone:""}})</div>
          <mu-sub-header>填写里程</mu-sub-header>
          <div>
            起始读数：
            <mu-text-field v-model="caruse.kilometres1">公里</mu-text-field>
            <mu-button small color="red" @click="submitStart">提交</mu-button>
          </div>
          <div>
            终止读数：
            <mu-text-field v-model="caruse.kilometres2">公里</mu-text-field>
            <mu-button small color="red" @click="submitOver">提交</mu-button>
          </div>
       
      </div>      
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Toast from "muse-ui-toast";
import TaskHeader from "./TaskHeader";
export default {
  name: "MyUse",
  components: {
    TaskHeader
  },
  data() {
    return {
      caruse: null
    };
  },
  computed: {
    ...mapState(["userinfo", "r"])
  },
  methods: {
    async submitStart() {
      if (!this.caruse.kilometres1) {
        this.$alert("请填写里程");
        return;
      }
      //先确认是否联系到司机，并出发？
      let sure = await this.$confirm("确定出发？", "提示");

      if (sure.result) {
        try {
          var resp = await this.r.post("upsert_ucf", {
            id: this.caruse.id,
            kilometres1: this.caruse.kilometres1
          });

          if (resp.data.code == 0) {
            Toast.success("里程添加成功");
          } else {
            Toast.error("里程添加失败");
          }
        } catch (error) {
          Toast.error("里程添加失败");
        }
      } else {
        Toast.info("点击了取消");
      }
    },
    async submitOver() {
      if (!this.caruse.kilometres2) {
        this.$alert("请填写里程");
        return;
      }

      //先确认已经返回？
      let sure = await this.$confirm("确定已返回？", "提示");

      if (sure.result) {
        try {
          var resp = await this.r.post("upsert_ucf", {
            id: this.caruse.id,
            kilometres2: this.caruse.kilometres2
          });

          if (resp.data.code == 0) {
            this.$alert("里程添加成功");
          } else {
            this.$alert("里程添加失败");
          }
        } catch (error) {
          this.$alert("里程添加失败");
        }
      } else {
        this.$alert("点击了取消");
      }
    }
  },
  mounted() {},
  watch: {
    userinfo(newVal) {
      // alert("hehe");
      const self = this;
      this.r
        .post("getucfs_user", { useraccount: self.userinfo.account })
        .then(resp => {
          let data = resp.data;
          // console.log(data);
          if (data.code == 0) {
            self.caruse = data.msg;
          }
          if (data.code == 1) {
            self.$alert(data.msg);
          }
        })
        .catch(err => {
          // self.$alert("您没有未出行车辆申请");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tablecon {
  padding-left: 20px;
  flex: 1 1 auto;
  overflow auto
  text-align left 
}
</style>
