<template>
  <div class="main">
    <task-header>
       <span style="font-size:16px;">车辆管理</span></task-header>
    <div class="tablecon" ref="tablecontainer">
      <mu-data-table
        style="width:100%;"
        selectable
        :selects.sync="selects"
        :height="tableHeight"
        :columns="columns"
        :sort.sync="sort"
        @sort-change="handleSortChange"
        :data="showlist"
      >
        <template slot-scope="scope">
          <td class="is-right">{{scope.row.number}}</td>
          <td class="is-right">{{scope.row.brand}}</td>
          <td class="is-right">{{scope.row.state?"出差":"在郑"}}</td>
          <td class="is-right">{{scope.row.sites}}</td>
        </template>
      </mu-data-table>
    </div>
    <div>
      <mu-text-field
        v-model="s_name"
        type="string"
        placeholder="请输入车牌号..."
        action-icon="search"
        :action-click="doSearch"
      ></mu-text-field>
      <mu-flex justify-content="center">
        <mu-button small @click="openAddcarFullscreenDialog">添加车辆</mu-button>
        <mu-button small @click="openUpdatecarFullscreenDialog">修改车辆</mu-button>
        <mu-button :disabled="locked.delete" small @click="deleteCar">删除车辆</mu-button>
      </mu-flex>
    </div>

    <!-- dialogs -->
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openAddcarFullscreen">
      <mu-appbar style="height:30px" color="red" title="添加车辆">
        <mu-button slot="right" flat @click="closeAddcarFullscreenDialog">关闭</mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <mu-form
          ref="addcar"
          :model="caradd"
          class="mu-demo-form"
          :label-position="labelPosition"
          label-width="100"
        >
          <mu-form-item prop="number" label="车牌" :rules="carnameRules">
            <mu-text-field v-model="caradd.number"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="brand" label="品牌" :rules="brandRules">
            <mu-text-field v-model="caradd.brand"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="sites" label="座数">
            <mu-text-field v-model="caradd.sites"></mu-text-field>
          </mu-form-item>
        </mu-form>

        <mu-button :disabled="locked.add" @click="addCar" color="red">添加</mu-button>
        <mu-button @click="clearAddCar">重置</mu-button>
      </div>
    </mu-dialog>

    <mu-dialog
      width="360"
      transition="slide-bottom"
      fullscreen
      :open.sync="openUpdatecarFullscreen"
    >
      <mu-appbar style="height:30px" color="red" title="修改车辆">
        <mu-button slot="right" flat @click="closeUpdatecarFullscreenDialog">关闭</mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <mu-form
          ref="updatecar"
          :model="carupdate"
          class="mu-demo-form"
          :label-position="labelPosition"
          label-width="100"
        >
          <mu-form-item prop="number" label="车牌" :rules="brandRules">
            <mu-text-field v-model="carupdate.number"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="brand" label="品牌" :rules="carnameRules">
            <mu-text-field v-model="carupdate.brand"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="state" label="状态">
            <mu-select v-model="carupdate.state">
              <mu-option v-for="value,key in states" :key="key" :label="value" :value="key"></mu-option>
            </mu-select>
          </mu-form-item>
          <mu-form-item prop="sites" label="座数">
            <mu-text-field v-model="carupdate.sites"></mu-text-field>
          </mu-form-item>
        </mu-form>
        <mu-button :disabled="locked.update" @click="updateCar" color="red">修改</mu-button>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TaskHeader from "./TaskHeader";
export default {
  name: "CarManage",
  components: {
    TaskHeader
  },
  data() {
    return {
      locked: {
        add: false,
        update: false,
        delete: false
      },
      tableHeight: 200,
      selects: [],
      s_name: "",
      openAddcarFullscreen: false,
      openUpdatecarFullscreen: false,
      sort: {
        name: "",
        order: "asc"
      },
      columns: [
        {
          title: "车牌",
          name: "NUMBER",
          width: 130,
          align: "left",
          sortable: true
        },
        {
          title: "品牌",
          name: "BRAND",
          width: 120,
          align: "center",
          sortable: true
        },
        {
          title: "状态",
          name: "STATE",
          width: 100,
          align: "center",
          sortable: true
        },
        {
          title: "座数",
          name: "SITES",
          width: 80,
          align: "center",
          sortable: true
        }
      ],
      showlist: undefined,
      allCars: undefined,
      carnameRules: [
        {
          validate: async val => {
            let resp = await this.r.post("getonecar", { carnumber: val });
            if (resp.data.code) {
              this.locked.add = false;
              return true;
            } else {
              this.locked.add = true;
              return false;
            }
          },
          message: "该账号已存在！"
        },
        { validate: val => !!val, message: "必须填写车牌" }
      ],
      brandRules: [{ validate: val => !!val, message: "必须填写车辆品牌" }],
      labelPosition: "left",
      caradd: {
        number: "",
        brand: "",
        state: 0,
        sites: ""
      },
      carupdate: {
        number: "",
        brand: "",
        state: "",
        sites: ""
      }
    };
  },
  computed: {
    ...mapState(["userinfo", "r"]),
    ...mapState({
      states: state => state.states
    })
  },
  methods: {
    handleSortChange({ name, order }) {
      this.list = this.list.sort((a, b) =>
        order === "asc" ? a[name] - b[name] : b[name] - a[name]
      );
    },
    openAddcarFullscreenDialog() {
      this.openAddcarFullscreen = true;
    },
    closeAddcarFullscreenDialog() {
      this.openAddcarFullscreen = false;
    },
    openUpdatecarFullscreenDialog() {
      let l = this.selects.length;
      if (0 == l) {
        this.$alert("请选择一个要修改的车辆！");
        return;
      } else if (l > 1) {
        this.$alert("一次仅可以修改一个车辆！");
        return;
      }
      this.carupdate = this.showlist[this.selects[0]];
      this.carupdate.state = this.carupdate.state ? "出差" : "在郑";
      // console.log(this.carupdate);
      this.openUpdatecarFullscreen = true;
    },
    closeUpdatecarFullscreenDialog() {
      this.openUpdatecarFullscreen = false;
    },
    doSearch() {
      const self = this;
      if (this.s_name) {
        this.r
          .post("getcars", { number: this.s_name })
          .then(function(resp) {
            let data = resp.data;

            if (0 == data.code) {
              // self.$toast.info(data.msg);
              self.showlist = JSON.parse(data.msg);
            }

            if (1 == data.code) self.$alert(data.msg);
          })
          .catch(function(error) {
            self.$alert(error);
          });
      } else this.showlist = this.allCars;
    },
    clearAddCar() {
      this.$refs.addcar.clear();
      this.caradd = {
        brand: "",
        name: "",
        state: "",
        sites: ""
      };
    },
    addCar() {
      this.locked.add = true;
      const self = this;
      // console.log(this.caradd);
      this.r
        .post("addcar", this.caradd)
        .then(function(response) {
          // console.log(response.data);
          let data = response.data;
          if (0 == data.code) self.$alert(data.msg);
          if (0 != data.code) self.$alert(data.msg);

          self.getAllCars();
          self.locked.add = false;
        })
        .catch(function(error) {
          self.$alert("车辆添加失败 " + error);
        });
    },
    updateCar() {
      this.locked.update = true;
      const self = this;
      // console.log(this.useradd);
      this.r
        .post("updatecar", this.carupdate)
        .then(function(response) {
          // console.log(response.data);
          let data = response.data;
          if (0 == data.code) self.$alert(data.msg);
          if (0 != data.code) self.$alert(data.msg);

          self.getAllCars();
          self.locked.update = false;
        })
        .catch(function(error) {
          self.$alert("车辆修改失败 " + error);
        });
    },
    deleteCar() {
      let l = this.selects.length;
      if (0 == l) {
        this.$alert("请选择一个要删除的车辆！");
        return;
      } else if (l > 1) {
        this.$alert("一次仅可以删除一个车辆！");
        return;
      }
      //delete car by id
      this.locked.delete = true;
      const self = this;
      // console.log(this.useradd);
      this.r
        .post("deletecar", { carnumber: this.showlist[this.selects[0]].number })
        .then(function(response) {
          // console.log(response.data);
          let data = response.data;
          if (0 == data.code) self.$alert(data.msg);
          if (0 != data.code) self.$alert(data.msg);

          self.selects = [];
          self.getAllCars();
          self.locked.delete = false;
        })
        .catch(function(error) {
          self.$alert("车辆删除失败" + error);
        });
    },
    getAllCars() {
      var self = this;
      this.r
        .post("getcars")
        .then(function(resp) {
          let data = resp.data;
          // console.log(data)
          if (1 == data.code) self.$alert(data.msg);
          if (0 == data.code) {
            self.allCars = JSON.parse(data.msg);
            self.showlist = self.allCars;
          }
        })
        .catch(function(error) {
          self.$alert(error);
        });
    }
  },
  mounted() {
    this.getAllCars();
    this.tableHeight = this.$refs.tablecontainer.clientHeight;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;

  .tablecon {
    flex: 1 1 auto;
  }

  .mu-table td {
    text-align: center;

  }

  .mu-input {
    font-size: 12px;
    width: 256px;
    min-height: 30px;
    display: inline-block;
    position: relative;
    color: rgba(0, 0, 0, 0.54);
    margin-bottom: 2px;
    padding-bottom: 2px;
    padding-top: 4px;
  }
}
</style>

