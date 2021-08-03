import { reject, resolve } from "core-js/fn/promise";
import Vue from "vue";
import Vuex from "vuex";
import { setCookie } from './util/cookie.js'
import { Menu } from './i18n/menuData.js'
import { loginByUsername, getInfo} from './api/login.js'
import { roleFilter } from './util/util.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    roles: [],
    info: {},
    menu: [],
    currentPath:'/'
  },
  mutations: {
    SET_INFO(state,info){
      state.info = info
    },
    SET_MENU(state,menu){
      state.menu = menu
    },
    SET_ROLES(state,roles){
      state.roles = roles
    },
    SET_CURRENT_PATH(state,currentPath){
      state.currentPath = currentPath
    },
  },
  actions: {
    LoginByUsername({commit},userInfo){
      const username = userInfo.username.trim()
      return new Promise((resolve,reject)=>{
        loginByUsername(username,userInfo.password).then(res=>{
          setCookie('Token',res.data.token)
          resolve()
        }).catch(err=>{
          reject(err)
        })
      })
    },
    getUserInfo({commit},token){
      return new Promise((resolve,reject)=>{
        getInfo(token).then(res=>{
          // 动态过滤的方法
          let MenuDataCopy = Menu
          console.log('原始菜单数据',MenuDataCopy)
          let menu = roleFilter(MenuDataCopy,res.roles)
          commit('SET_INFO',res.info)
          commit('SET_ROLES',res.roles)
          commit('SET_MENU',menu)
          resolve(menu)
        }).catch(err=>{
          reject(err)
        })
      })
    }
  }
});
