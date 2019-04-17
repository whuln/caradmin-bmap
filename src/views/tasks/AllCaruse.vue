<template>
  <div>
    <task-header>所有用车</task-header>



    所有用车
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TaskHeader from './TaskHeader'
export default {
  name:'AllCaruse',
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
