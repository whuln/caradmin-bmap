<template>
<span>
  <mu-text-field :style="style" 
  :value="mydate?mydate.toLocaleDateString():''" 
  @click="onInputClick" :label="label"></mu-text-field>
  <mu-date-picker color="red" v-if="visible" :date.sync="mydate" @change="onDateChange"></mu-date-picker>
</span>
    
</template>
<script>
import { Stream } from 'stream';
export default {
  model: {
    // prop: 'date',
    event: 'change'
  },
  props:{
    // date: Date,
    width:Number,
    label:String
  },
  data(){
    return {
      visible: false,
      mydate:undefined,
      style:{
        width: this.width + "px"
      }
    }
  },methods:{
    onInputClick(){
      this.visible = true
    },
    onDateChange(date){
      this.$emit('change', date)
      this.visible = false
    }

  }
}
</script>


