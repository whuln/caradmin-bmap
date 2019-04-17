<template>
  <div>
    <task-header>用户管理</task-header>

    用户管理
  </div>
</template>

<script>
import { mapState } from "vuex";
import TaskHeader from './TaskHeader'

export default {
  name:'UserManage',
  components:{
    TaskHeader,
  }
}
</script>
