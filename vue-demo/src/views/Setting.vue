<template>
  <div class="setting-wrapper">
    <div class="setting-outer">
      <div class="flex-row align-center setting-item">
        <div class="setting-label">旧密码:</div>
        <el-input v-model="oldValue" placeholder="请输入内容" size="small" clearable></el-input>
      </div>
      <div class="flex-row align-center setting-item">
        <div class="setting-label">新密码:</div>
        <el-input v-model="newValue" placeholder="请输入内容" size="small" clearable></el-input>
      </div>
      <div class="flex-row align-center space-around">
          <el-button type="danger" size="small" @click="reset">重置</el-button>
          <el-button type="primary" size="small" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldValue: '',
      newValue: '',
    };
  },
  methods:{
      reset(){
          this.oldValue = ''
          this.newValue = ''
      },
      save(){
          this.$message.success('保存成功')
          this.oldValue = ''
          this.newValue = ''
      }
  }
};
</script>

<style>
.setting-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
}
.setting-outer{
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.setting-item{
    margin-bottom: 25px;
}
.setting-label{
    margin-right: 10px;
}
.el-input {
    width: 220px;
}
.el-button{
    width: 100px;
}
</style>
