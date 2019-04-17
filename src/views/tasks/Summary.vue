<template>
  <div class="main">
    <task-header>
      <span style="font-size:16px;">汇总统计</span>
    </task-header>
    <div style="vertical-align: bottom;">
      <!-- <mu-date-input style="width:150px;" v-model="year" prefix="选择年份:" suffix="年" type="year"></mu-date-input>&nbsp;&nbsp;&nbsp;&nbsp;
      <mu-select style="width:150px;" prefix="选择月份:" suffix="月" v-model="month" fill>
        <mu-option v-for="option,index in months" :key="option" :label="option" :value="option"></mu-option>
      </mu-select>-->
      <mu-date-input style="width:35%;"  v-model="startDate" label="起始时间" label-float></mu-date-input>
     ~
      <mu-date-input style="width:35%;" v-model="stopDate" label="终止时间" label-float></mu-date-input>
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
export default {
  name: "Summary",
  components: {
    TaskHeader
  },
  computed: {
    ...mapState(["userinfo", "r"])
  },
  data() {
    return {
      startDate: undefined,
      stopDate: undefined,
      columns: [
        { title: "统计项", width: 80, name: "subject" },
        {
          title: "距离(km)",
          name: "distance",
          width: 100,
          align: "center",
          sortable: true
        },
        {
          title: "出车次数",
          name: "times",
          width: 70,
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
      resp = await this.r.post("getsummary", {
        d_min: this.startDate.toLocaleDateString(),
        d_max: this.stopDate.toLocaleDateString()
      });
      console.log(resp.data);
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
}
</style>
