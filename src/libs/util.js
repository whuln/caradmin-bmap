import Cookies from "js-cookie";
import store from "@/store"
import Toast from "muse-ui-toast";
const in30Minutes = 1 / 48,
  in60Minutes = 1 / 24,
  in2Minutes = 1 / 720,
  in2Seconds = 1 / 43200;


export const TOKEN = "log_token"

export function logOut(router){
  //log_token 清空
  Cookies.set(TOKEN, "")
  router.push("/")
}

export function getToken() {
  const token = Cookies.get(TOKEN);
  if (token) return token;
  else return false;
}

export function setToken(token, remember) {
  let expires = in30Minutes;
  if (!remember) expires = in2Seconds;

  return Cookies.set(TOKEN, token, { expires })
}

export async function fetchUserinfo(token, next){
  // console.log('fetchUserinfo');
  
  //先获取userinfo
  const resp = await store.state.r.post("getuserinfo", { token });
  if (resp.data.code == 0) {
    //把userinfo放到store里面
    const userinfo = resp.data.msg;
    store.commit("setUserinfo", userinfo);
  }else{
    Toast.error("登录错误：" + resp.data.msg);
    next("/")
  }  
}