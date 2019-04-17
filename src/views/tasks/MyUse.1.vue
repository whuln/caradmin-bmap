<template>
  <div class="main">
    <task-header >我的用车</task-header>
    <div class="content">
      <router-view></router-view>
    </div>


    <mu-bottom-nav class="footer" color="red">
      <mu-bottom-nav-item title="当前用车" icon="restore"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="历史用车" icon="view_headline"></mu-bottom-nav-item>     
    </mu-bottom-nav>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TaskHeader from "./TaskHeader";
export default {  
  components: {
    TaskHeader
  },
  computed: {
    ...mapState(["userinfo"])
  },
  methods: {
    handleApply() {
      console.log(this.userinfo);
    }
  }
};
</script>
<style lang="stylus" scoped>
  .main{
    display flex
    flex-direction column
    height 100%
    .header{
      flex 0 0 30px
    }
    .content{
      flex 1 1 auto 
    }
    .footer{
      flex 0 0 60px
    }
  }
</style>
