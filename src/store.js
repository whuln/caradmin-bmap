import Vue from "vue";
import Vuex from "vuex";
import request from "./libs/api.request";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    rememberMe: false,
    url: "",    //保存到localStorage
    userinfo: {},
    r: new request(),
    states: ["在郑", "出差"],
    rolenames: ["管理员", "院领导", "主管领导", "部门主任", "职工", "司机"],
    departments: [
      "院领导",
      "办公室",
      "生产技术部",
      "财务部",
      "市场部",
      "研发部",
      "测绘工程1部",
      "测绘工程2部",
      "测绘工程3部",
      "测绘工程4部",
      "地理信息中心",
      "航测遥感中心",
      "航测摄影中心"
    ]
  },
  getters: {
    accesses: state => {
      if (state.userinfo.role) {
        return state.userinfo.role.accesses;
      }

      return [];
    }
  },
  mutations: {
    changeRememberMe(state, bool) {
      state.rememberMe = bool;
    },
    setUserinfo(state, userinfo) {
      // console.log('setUserinfo');
      state.userinfo = userinfo;
    },
    changeRequest(state, url) {
      state.url = "http://" + url;
      state.r = new request(state.url)
    }
  },
  actions: {}
});
