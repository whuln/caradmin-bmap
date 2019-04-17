<template>
  <div>
    <task-header>我的任务</task-header>
    <div class="tablecon">
      <div  v-if="carapply.carnumber == null">您当前没有出车安排</div>
      <div  v-else>
        您即将出行的用车安排信息如下：
        <mu-list>
          <mu-sub-header>基本信息</mu-sub-header>
          <mu-list-item>用车人：{{carapply.user.name}}(电话：{{carapply.user.phone}})</mu-list-item>
          <mu-list-item>项目 ：{{carapply.project}}</mu-list-item>
          <mu-list-item>用途：{{carapply.purpose}}</mu-list-item>
          <mu-list-item>地点：{{carapply.places}}</mu-list-item>
          <mu-list-item>计划出发日期：{{carapply.plantime1}}</mu-list-item>
          <mu-list-item>计划回程日期：{{carapply.plantime2}}</mu-list-item>
          <mu-sub-header>填写信息</mu-sub-header>
          <mu-list-item>
            实际出发日期：
            <mu-date-input v-model="carapply.actualtime1" label-float></mu-date-input>
            <br>
            <mu-button small color="red" :disabled="carapply.isgo" @click="onGo">确认出发</mu-button>
          </mu-list-item>
          <mu-list-item>
            实际返回日期：
            <mu-date-input v-model="carapply.actualtime2" label-float></mu-date-input>
            <br>
            <mu-button small color="red" :disabled="carapply.isback" @click="onBack">确认交车</mu-button>
          </mu-list-item>
        </mu-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TaskHeader from "./TaskHeader";
export default {
  name: "MyTask",
  components: {
    TaskHeader
  },
  data() {
    return {
      carapply: {}
    };
  },
  computed: {
    ...mapState(["userinfo", "r"])
  },
  methods: {
    nullOrempty(val) {
      return val == null || val == "";
    },
    async onGo() {
      if (this.nullOrempty(this.carapply.actualtime1)) {
        this.$alert("请选择出发日期！");
        return;
      }

      try {
        var resp = await this.r.post(
          "upsert_ucf",
          qs.stringify({
            id: this.carapply.id,
            isgo: 1,
            actualtime1: this.carapply.actualtime1
          })
        );

        if (resp.data.code == 0) {
          this.carapply.isgo = 1;
          this.$alert("提交成功");
        } else {
          this.$alert("提交失败");
        }
      } catch (error) {
        this.$alert("提交失败");
      }
    },
    async onBack() {
      if (this.nullOrempty(this.carapply.actualtime2)) {
        this.$alert("请选择返回日期！");
        return;
      }

      try {
        var resp = await this.r.post("upsert_ucf", {
          id: this.carapply.id,
          isback: 1,
          actualtime2: this.carapply.actualtime2,
          driveraccount: this.carapply.driveraccount,
          carnumber: this.carapply.carnumber
        });
        if (resp.data.code == 0) {
          this.carapply.isback = 1;
          // this.carapply = {};
          this.$alert("提交成功 ");
          setTimeout(() => {
            this.getCaruse();
          }, 1000);
        } else {
          this.$alert("提交失败");
        }
      } catch (error) {
        this.$alert("提交失败");
      }
    },
    async getCaruse() {
      const self = this;
      try {
        let resp = await this.r.post("getucfs_driver", {
          driveraccount: this.userinfo.account
        });
        let data = resp.data;
        if (data.code == 0) {
          self.carapply = data.msg;
          // console.log(self.carapply);
        }
        if (data.code == 1) {
          this.carapply = {};
          self.$alert("您当前没有出车安排");
        }
      } catch (error) {
        self.$alert("您当前没有出车安排");
      }
    }
  },
  mounted() {
    this.getCaruse();
  }
};
</script>
