<template>
  <div class="main">
    <task-header>
      <span style="font-size:16px;">汇总统计</span>
    </task-header>
    <div style="text-align:left">     
      <my-date-input :width='100' label="起始时间" v-model="startDate"></my-date-input>
     ~
      <my-date-input :width='100'  v-model="stopDate" label="终止时间"></my-date-input>
      <mu-button @click="doTongji" color="red" small>统计</mu-button>
    </div>    
    <div ref="summaryContentDiv" style="overflow:auto;">
      <fieldset v-for="item in summary">
        <legend>{{item.type}}</legend>
        <mu-data-table :columns="columns" :data="item.data">
          <template slot-scope="scope">
            <td>{{scope.row.key}}</td>
            <td class="is-right">{{scope.row.distance}}</td>
            <td class="is-right">{{scope.row.times}}</td>
            <td class="is-right">{{scope.row.places}}</td>
          </template>
        </mu-data-table>
      </fieldset>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TaskHeader from "./TaskHeader";
import MyDateInput from "@/components/MyDateInput";
export default {
  name: "Summary",
  components: {
    TaskHeader,
    MyDateInput
  },
  computed: {
    ...mapState(["userinfo", "r"])
  },
  data() {
    return {
      date:undefined,
      startDate: undefined,
      stopDate: undefined,
      columns: [
        { title: "统计项", width: 105, name: "subject" },
        {
          title: "距离(km)",
          name: "distance",
          width: 100,
          align: "center",
          sortable: true
        },
        {
          title: "次数",
          name: "times",
          width: 50,
          align: "center",
          sortable: true
        },
        {
          title: "出车地点",
          name: "places",
          width: 100,
          align: "center",
          sortable: true
        }
      ],
      summary: []
    };
  },
  methods: {
    async doTongji() {
      // console.log(this.startDate);
      // console.log(this.stopDate);
            
      const resp = await this.r.post("getsummary", {
        d_min: this.startDate.toLocaleDateString(),
        d_max: this.stopDate.toLocaleDateString()
      });
      // console.log(resp.data);
      this.summary = resp.data;
    }
  }
};
</script>
<style lang="stylus" scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;

  .summaryContentDiv {
    flex: 1 1 auto;
    overflow: auto;
  }

  fieldset{
    padding 0
  }
}
</style>
