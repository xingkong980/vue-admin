<template>
  <div>
    <div class="search-row flex-row">
      <el-input placeholder="请输入内容" size="small" v-model="input" clearable>
      </el-input>
      <el-input placeholder="请输入内容" size="small" v-model="input" clearable>
      </el-input>
      <div class="flex-row flex-start align-center">
        <div class="label">培训时间</div>
        <el-input
          placeholder="请输入内容"
          size="small"
          v-model="input"
          clearable
        >
        </el-input>
      </div>
      <div class="flex-row flex-start align-center">
        <div class="label">培训状态</div>
        <el-select v-model="value" clearable placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="flex-row flex-start align-center">
        <div class="label">报名状态</div>
        <el-select v-model="value" clearable placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="danger" size="small">查询</el-button>
        <el-button type="primary" size="small">新增培训</el-button>
      </div>
    </div>
    <div style="padding:20px">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        size="small"
        :header-cell-style="headStyle"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'train-management',
  data() {
    return {
      input: '',
      value: '',
      options: [],
      tableData: [],
      headStyle: {
        'background-color': '#409eff',
        'color': '#ffffff',
        'font-weight':'500'
      },
    };
  },
  methods: {
    jumpEdit() {
      this.$router.push('/dashborad/training/trainManagement/' + '123');
    },
  },
};
</script>

<style>
.search-row {
  padding: 10px 20px;
  flex-wrap: wrap;
}
/** 选择框本质上也是输入框，所以输入框的样式会影响到他 */
.el-input {
  width: 135px;
  margin-right: 20px;
  flex-shrink: 0;
  margin-top: 10px;
}
.label {
  flex-shrink: 0;
  margin-top: 10px;
  margin-right: 5px;
}
.el-button {
  flex-shrink: 0;
  margin-top: 10px;
}
</style>
