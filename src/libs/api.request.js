'use strict';
import axios from 'axios';

//开发
const baseURL = "http://10.4.148.155:7001/";

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 15000;
axios.defaults.headers.post['Content-Type'] ='application/json;charse=UTF-8'
// axios.defaults.xsrfHeaderName = 'x-csrf-token';
// axios.defaults.xsrfCookieName = 'csrfToken';


export default url => {
  if(url) axios.defaults.baseURL = url;
  
  return {
     post(url, json) {   
    return axios.post(url, json);
  },
  get(url) {
    return axios.get(url);
  }
  }
 
};