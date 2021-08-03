<template>
  <div class="menu-outer" :class="[isCollapse ? '' : 'min-width']">
    <el-menu
      class="el-menu-vertical"
      default-active="2"
      mode="vertical"
      :collapse="isCollapse"
      :collapse-transition="animate"
    >
      <!-- 有子菜单的用submenu -->
      <div v-for="(item, index) in menuData" :key="index">
        <div v-if="!item.hiddren">
          <el-submenu
            v-if="item.children && item.children.length > 0"
            :index="item.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <div v-for="(child, index) in item.children" :key="index">
                <el-menu-item
                  @click="jump(child.path, item.path)"
                  :index="child.id"
                  v-if="!child.hiddren"
                >
                  {{ child.name }}
                </el-menu-item>
              </div>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else @click="jump(item.path)" :index="item.id"
            ><i class="el-icon-menu"></i>
            <span slot="title">{{ item.name }}</span></el-menu-item
          >
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'menu-aside',
  props: {
    menuData: {
      type: Array,
      default: [],
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      animate: false,
    };
  },
  created() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    jump(path, father) {
      let url = '';
      if (father) {
        this.$store.commit('SET_CURRENT_PATH', father + path);
        url = '/dashborad' + father + path;
      } else {
        this.$store.commit('SET_CURRENT_PATH', path);
        url = '/dashborad' + path;
      }
      this.$router.push(url);
    },
  },
};
</script>

<style>
.menu-outer {
  height: 100%;
}
.el-menu-vertical {
  height: 100%;
}
.min-width {
  min-width: 201px;
}
</style>
