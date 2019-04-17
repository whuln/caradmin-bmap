<template>
  <div>
    <task-header>申请用车</task-header>

    <mu-flex class="main" ref="formcontainer" fill direction="column">
      <mu-form ref="fcarapply" :model="carapply" label-position="left" label-width="100">
        <mu-form-item prop="project" label="项目" :rules="NotNullRules">
          <mu-text-field v-model="carapply.project"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="purpose" label="用途" :rules="NotNullRules">
          <mu-text-field v-model="carapply.purpose"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="places" label="地点" :rules="NotNullRules">
          <mu-text-field v-model="carapply.places"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="plantime1" label="计划出发时间" :rules="NotNullRules">
          <mu-date-input v-model="carapply.plantime1" label-float full-width></mu-date-input>
        </mu-form-item>
        <mu-form-item prop="plantime2" label="计划回程时间" :rules="NotNullRules">
          <mu-date-input v-model="carapply.plantime2" label-float full-width></mu-date-input>
        </mu-form-item>
        <mu-form-item prop="isshengwai" label="是否省外">
          <mu-checkbox v-model="carapply.isshengwai" color="red"></mu-checkbox>
        </mu-form-item>
      </mu-form>
    </mu-flex>
    <mu-flex justify-content="center">
      <mu-button :disabled="locked.submit" @click="doSubmit" small color="red">提交</mu-button>
      <mu-button @click="clear" small>重置</mu-button>
    </mu-flex>

    <!-- dialogs -->
    <mu-dialog
      transition="slide-bottom"
      scrollable      
      :open.sync="openPushFullscreen"
    >
      <mu-appbar slot="title" style="width: 100%;height:30px;" >
        <span style="font-size:16px;"> 确认提交信息 </span>
        <mu-button flat  @click="openPushFullscreen = false" slot="right">
          <i class="material-icons">clear</i>
        </mu-button>
      </mu-appbar>
     
        <mu-form ref="fcarapply" :model="carapply" label-position="left" label-width="100">
          <mu-form-item prop="name" label="用车人" :rules="NotNullRules">
            <mu-text-field v-model="carapply.name" disabled></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="department" label="部门" :rules="NotNullRules">
            <mu-text-field v-model="carapply.department" disabled></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="project" label="项目" :rules="NotNullRules">
            <mu-text-field v-model="carapply.project" disabled></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="purpose" label="用途" :rules="NotNullRules">
            <mu-text-field v-model="carapply.purpose" disabled></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="places" label="地点" :rules="NotNullRules">
            <mu-text-field v-model="carapply.places" disabled></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="plantime1" label="计划出发时间" :rules="NotNullRules">
            <mu-date-input v-model="carapply.plantime1" label-float full-width disabled></mu-date-input>
          </mu-form-item>
          <mu-form-item prop="plantime2" label="计划回程时间" :rules="NotNullRules">
            <mu-date-input v-model="carapply.plantime2" label-float full-width disabled></mu-date-input>
          </mu-form-item>
          <mu-form-item prop="isshengwai" label="是否省外">
            <mu-checkbox v-model="carapply.isshengwai" disabled></mu-checkbox>
          </mu-form-item>
        </mu-form>      
    
      <mu-button slot="actions" :disabled="locked.checked" @click="doPush" color="red" small>确认申请</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TaskHeader from "./TaskHeader";
import Toast from "muse-ui-toast";
export default {
  name: "CarApply",
  components: {
    TaskHeader
  },
  data() {
    return {
      carapply: {
        name: "",
        useraccount: "",
        department: "",
        project: "",
        purpose: "",
        places: "",
        plantime1: "",
        plantime2: "",
        isshengwai: false
      },
      locked: {
        submit: false,
        checked: false
      },
      checkAccount: "",
      openPushFullscreen: false,
      NotNullRules: [{ validate: val => !!val, message: "不能为空" }]
    };
  },
  computed: {
    ...mapState(["userinfo", "r"])
  },
  methods: {
    clear() {
      this.carapply.project = "";
      this.carapply.purpose = "";
      this.carapply.places = "";
      this.carapply.plantime1 = "";
      this.carapply.plantime2 = "";
      this.carapply.isshengwai = false;
    },
    addCarApply() {},
    doSubmit() {
      this.carapply.name = this.userinfo.name;
      this.carapply.useraccount = this.userinfo.account;
      this.carapply.department = this.userinfo.department;
      this.openPushFullscreen = true;
      // console.log(this.userinfo);
    },
    async doPush() {
      const self = this;
      this.openPushFullscreen = true;
      if (this.role == "部门主任") {
        this.carapply.isdmagree = 1;
      }
      if (this.role == "院领导") {
        this.carapply.isdmagree = 1;
        this.carapply.yldagree = 1;
      }
      let resp = await this.r.post(
        "adducfs_user",
        self.carapply
      );
      let data = resp.data;
      // console.log(data)
      if (data.code == 0) {
        Toast.success(data.msg);
      }

      if (data.code != 0) {
        Toast.error(data.msgdata.msg + ", 请重新填写。");
      }
      this.openPushFullscreen = false;
    }
  },
  mounted() {}
};
</script>
