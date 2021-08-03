<template>
  <div class="layout">
    <el-container class="hold-page">
      <el-header class="header">
        <div class="header-left">
          <i class="el-icon-s-fold" @click="isCollapse = !isCollapse"></i>
          <div class="title">奇瑞管理后台</div>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            设置<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setting">设置密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container class="menu-main">
        <menu-aside :menuData="menu" :isCollapse="isCollapse"></menu-aside>
        <el-main class="main-container">
          <el-breadcrumb separator=">" class="breadcrumb">
            <el-breadcrumb-item v-for="item in routerChain" :key="item">{{
              item
            }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="main-content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import MenuAside from '@/components/Menu';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { readCookie, delCookie } from '@/util/cookie.js';
export default {
  name: 'layout',
  components: {
    MenuAside,
  },
  data() {
    return {
      routerChain: [],
      isCollapse: false,
    };
  },
  computed: {
    ...mapState(['currentPath', 'menu']),
    currentPathArr: function() {
      return this.currentPath.split('/').splice(1, this.currentPath.length - 1);
    },
  },
  watch: {
    currentPath() {
      this.getFinalRouterChain();
      // this.test('/training/trainManagement/:id')
    },
  },
  methods: {
    ...mapMutations(['SET_CURRENT_PATH']),
    logout() {
      delCookie('Token');
      this.$router.push('/login');
    },
    setting(){
      this.SET_CURRENT_PATH('/setting');
      this.$router.push('/dashborad/setting');
    },
    // getRouterChain(arr, key) {
    //   let index = key || 0;
    //   if (this.currentPath && arr.length > 0) {
    //     arr.forEach((one) => {
    //       if (
    //         one.children &&
    //         one.children.length > 0 &&
    //         one.path == '/' + this.currentPathArr[index]
    //       ) {
    //         this.routerChain[index] = one.name;
    //         this.getRouterChain(one.children, ++index);
    //       } else {
    //         if (one.path && one.path == '/' + this.currentPathArr[index]) {
    //           this.routerChain[index] = one.name;
    //           return;
    //         }
    //       }
    //     });
    //   }
    // },
    getRouterChainDEMO(arr, key, headpath) {
      let that = this;
      let index = key || 0;
      let head = headpath || '';
      if (this.currentPath && arr.length > 0) {
        arr.forEach((one) => {
          // 创建匹配正则
          let regPath = head + one.path;
          if (regPath.indexOf(':') != -1) {
            regPath = regPath.replace(/(:[^;]*\/|:[^;]*$)/g, '([^;]*)/');
            regPath = regPath.replace(/(\/$)/, '');
          }
          let exp = new RegExp('^' + regPath + '([^;]*)');
          if (
            one.children &&
            one.children.length > 0 &&
            that.currentPath.match(exp)
          ) {
            this.routerChain[index] = one.name;
            this.getRouterChainDEMO(one.children, ++index, head + one.path);
          } else {
            if (that.currentPath.match(exp)) {
              this.routerChain[index] = one.name;
              return;
            }
          }
        });
      }
    },
    getFinalRouterChain() {
      this.routerChain = [];
      this.getRouterChainDEMO(this.menu);
    },
  },
  created() {
    this.$store.dispatch('getUserInfo', readCookie('Token')).then((res) => {
      this.SET_CURRENT_PATH(this.$route.path.split('/dashborad')[1]);
      this.getFinalRouterChain();
    });
  },
};
</script>

<style scoped>
.layout,
.hold-page {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #409eff;
  color: aliceblue;
}
.header-left{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.menu-main {
  flex: 1;
  max-height: calc(100% - 60px);
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.router-chain {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.el-dropdown-link {
  color: aliceblue;
  cursor: pointer;
}
.el-icon-s-fold {
  width: 30px;
  height: 30px;
  font-size: 30px;
  margin-right: 160px;
}
.title{
  font-size: 15px;
}
.main-container{
  background-color: whitesmoke;
  padding: 0px;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.breadcrumb{
  padding: 15px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  overflow: hidden;
}
.main-content{
  flex: 1;
  overflow: auto;
}
</style>
