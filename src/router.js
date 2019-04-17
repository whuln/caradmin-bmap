import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./Login.vue";

import { getToken, fetchUserinfo } from '@/libs/util.js'

Vue.use(Router);

let router = new Router({
  // mode: "history",
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/user-manage",
      name: "user-manage",
      component: () =>
        import("./views/tasks/UserManage.vue")
    },
    {
      path: "/car-apply",
      name: "car-apply",
      component: () =>
        import("./views/tasks/CarApply.vue")
    },
    {
      path: "/my-use",
      name: "my-use",
      component: () =>
        import("./views/tasks/MyUse.vue")
    },
    {
      path: "/my-approve",
      name: "my-approve",
      component: () =>
        import("./views/tasks/MyApprove.vue")
    },
    {
      path: "/my-task",
      name: "my-task",
      component: () =>
        import("./views/tasks/MyTask.vue")
    },
    {
      path: "/my-dispatch",
      name: "my-dispatch",
      component: () =>
        import("./views/tasks/MyDispatch.vue")
    },
    {
      path: "/user-manage",
      name: "user-manage",
      component: () =>
        import("./views/tasks/UserManage.vue")
    },
    {
      path: "/car-manage",
      name: "car-manage",
      component: () =>
        import("./views/tasks/CarManage.vue")
    },
    {
      path: "/all-caruse",
      name: "all-caruse",
      component: () =>
        import("./views/tasks/AllCaruse.vue")
    },
    {
      path: "/summary",
      name: "summary",
      component: () =>
        import("./views/tasks/Summary.vue")
    },
    {
      path: "/map",
      name: "map",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Map.vue")
    }
  ]
});

const LOGIN_PAGE_NAME = 'login'
router.beforeEach((to, from, next) => {
  const token = getToken();
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    
    next({
      name: LOGIN_PAGE_NAME
    });
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    next()
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    //有token，先获取userinfo，放到store里面，然后进入页面
    fetchUserinfo(token, next);
    // 已登录且要跳转的页面是登录页
    next({
      name: "home" // 跳转到home页
    });
  } else if (token && to.name !== LOGIN_PAGE_NAME) {
    //有token，先获取userinfo，放到store里面，然后进入页面
    fetchUserinfo(token, next)
    next();
  }
})

export default router;