<template>
  <div>
    <mu-appbar class="header" color="red">
      <mu-button icon slot="left" @click="goHome">
        <i class="material-icons">keyboard_arrow_left</i>
      </mu-button>
      <slot></slot>
    </mu-appbar>
  </div>
</template>
<script>
export default {
  name:'TaskHeader',
  methods:{
    goHome(){
      this.$router.push('home')
    }
  }
}
</script>

<style lang="stylus" scoped>
.header {
  width: 100%;
  height: 30px;
}
</style>