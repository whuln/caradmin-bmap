<template>
  <div>
    <task-header>车辆管理</task-header>



    车辆管理
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TaskHeader from './TaskHeader'
export default {
  name:'CarManage',
  components:{
    TaskHeader,
  },
  computed:{
    ...mapState(["userinfo"])
  },
  methods:{
    handleApply(){
      console.log(this.userinfo);
      
    }
  }
}
</script>
