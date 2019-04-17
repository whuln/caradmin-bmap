import Vue from "vue";
import Vuex from "vuex";
import request from "./libs/api.request";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:"",
    rememberMe:false,
    url:"",    //保存到localStorage
    userinfo:{},
    r:new request()
  },
  getters:{
    accesses: state => {
      if(state.userinfo.role) {
        return state.userinfo.role.accesses;
      }

      return [];
    }
  },
  mutations: {
    changeRememberMe(state,bool){
      state.rememberMe = bool; 
    },    
    setUserinfo(state, userinfo){
      // console.log('setUserinfo');
      state.userinfo = userinfo;
    },
    changeRequest(state, url){
      state.url = "http://" + url;
      state.r = new request(state.url)
    }
  },
  actions: {}
});
