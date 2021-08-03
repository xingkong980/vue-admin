<template>
  <div class="home">
    <div class="login-outer">
      <div class="login-title margin-bottom">系统登录</div>
      <div class="flex-row align-center margin-bottom">
        <div class="setting-label">账号:</div>
        <el-input
          v-model="account"
          placeholder="请输入内容"
          size="small"
          clearable
        ></el-input>
      </div>
      <div class="flex-row align-center margin-bottom">
        <div class="setting-label">密码:</div>
        <el-input
          v-model="password"
          placeholder="请输入内容"
          size="small"
          clearable
        ></el-input>
      </div>
      <div class="flex-row align-center space-around">
        <el-button type="primary" size="small" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { delCookie, readCookie } from '@/util/cookie.js';
import { post } from '@/util/request.js';
export default {
  name: 'home',
  // components: {
  //   HelloWorld
  // },
  data() {
    return {
      account: '',
      password: '',
    };
  },
  computed: {
    ...mapState(['token']),
  },
  methods: {
    ...mapMutations(['SET_CURRENT_PATH']),
    login() {
      this.$store
        .dispatch('LoginByUsername', {
          username: this.account,
          password: this.password,
        })
        .then(() => {
          this.$store
            .dispatch('getUserInfo', readCookie('Token'))
            .then((res) => {
              this.SET_CURRENT_PATH('/index');
              this.$router.push('/dashborad/index');
            });
        });
    },
    test() {},
  },
  mounted() {
    delCookie('Token');
  },
  created() {
    post('ICP20117/GetGuideActivityList', {
      AccountID: '100001@44A10',
      TokenID: 'test_20210721140944220',
      OperationCode: '995',
      DlrCd: 'D0001',
      OrgnzId: '3123',
      GuideDlrCd: '',
      GuideId: '',
      ActivityName: '',
      SearchStartDate: '',
      SearchEndDate: '',
      ActivityStatus: '0',
      SelectedPage: 1,
      DataCnt: 50,
    }).then((res) => {
      console.log('获取数据：', res);
    });
  },
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgba(44, 62, 80,.3);
}
.login-outer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* margin: 50px 500px; */
}
.margin-bottom {
  margin-bottom: 15px;
}
.login-btn {
  border: cornflowerblue 1px solid;
  border-radius: 10px;
  text-align: center;
  padding: 5px 10px;
}
</style>
