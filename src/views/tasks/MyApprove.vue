<template>
  <div>
    <task-header>我的审批</task-header>
   
      <!-- <span style="font-size:1rem;">待审批车辆申请列表</span> -->
      
        <mu-list @change="listChange">
          <mu-list-item v-for="item, key in carexamines" button :ripple="false" :value="key">
            <mu-list-item-title>{{item.user.name}}</mu-list-item-title>
            <mu-list-item-action>
              <mu-chip class="demo-chip">{{item.project}}</mu-chip>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>

        <mu-dialog
          title="审批用车申请"
          scrollable
          width="600"
          transition="slide-bottom"
          :open.sync="openAgreeFullscreen"
        >
          <mu-list>
            <mu-list-item>用车人：{{caSelected.user?caSelected.user.name:""}}</mu-list-item>

            <mu-list-item v-if="this.userinfo.rolename != '部门主任'">部门 ：{{caSelected.department}}</mu-list-item>
            <mu-list-item>项目 ：{{caSelected.project}}</mu-list-item>
            <mu-list-item>用途：{{caSelected.purpose}}</mu-list-item>
            <mu-list-item>地点 ：{{caSelected.places}}</mu-list-item>
            <mu-list-item>计划出发时间：{{caSelected.plantime1}}</mu-list-item>
            <mu-list-item>计划回程时间：{{caSelected.plantime2}}</mu-list-item>
            <mu-list-item>是否省外：{{caSelected.isshengwai?"省外":"省内"}}</mu-list-item>
          </mu-list>
          <mu-button color="red" @click="onAgree">同意</mu-button>
        </mu-dialog>
     
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TaskHeader from "./TaskHeader";
export default {
  name: "MyApprove",
  components: {
    TaskHeader
  },
  computed: {
    ...mapState(["userinfo", "r"])
  },
  data() {
    return {
      checkAccount: "",
      openAgreeFullscreen: false,
      carexamines: [],
      selectedCaIndex: "",
      caSelected: {}
    };
  },
  methods: {
    listChange(value) {
      this.selectedCaIndex = value;
      this.caSelected = this.carexamines[this.selectedCaIndex];
      this.openAgreeFullscreen = true;
    },
    async onAgree() {
      const self = this;
      // this.caSelected.isdmagree = true;
      let update = {};
      update.id = this.caSelected.id;
      if (this.userinfo.rolename == "部门主任") {
        update.isdmagree = true;
      } else {
        update.yuanlingdao = this.userinfo.account;
        update.yldagree = true;
      }

      let resp = await this.r.post("upsert_ucf", update);
      let data = resp.data;

      if (0 == data.code) {
        this.carexamines.splice(this.selectedCaIndex, 1);
        this.caSelected = {};
        this.selectedCaIndex = "";
        this.$alert("审核成功！");
        this.openAgreeFullscreen = false;
      }
      if (0 != data.code) {
        this.$alert("审核不成功！");
      }
    }
  },
  mounted() {
    //获取用车审批
    // console.log("审批");
    const self = this;
    let where = {};

    if (this.userinfo.rolename == "部门主任") {
      where.department = this.userinfo.department;
    } else {
      where.isshengwai = 1;
    }
    //  console.log(where);
    this.r
      .post("getucfs_dm", where)
      .then(function(resp) {
        let data = resp.data;
        if (data.code == 0) {
          self.carexamines = data.msg;
        }

        if (data.code == 1) {
          // this.$alert(data.msg);
          self.$alert("您没有要审批的用车申请");
        }
      })
      .catch(function(err) {
        self.$alert(err);
      });
  }
};
</script>
