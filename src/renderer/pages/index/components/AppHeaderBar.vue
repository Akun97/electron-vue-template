<template>
  <div class="home-header relative flex flex-ai-center">

    <!-- 双击仅限macos触发 -->
    <div class="flex-1 height-full" @dblclick="maxWindow"></div>

    <div v-if="platform === 'win32'" class="home-header-tools flex absolute">
      <el-button class="iconfont icon-zuixiaohua home-header-tools-item" @click="minWindow"></el-button>
      <el-button class="iconfont icon-zuidahua home-header-tools-item" @click="maxWindow"></el-button>
      <el-button class="iconfont icon-guanbi home-header-tools-item" @click="closeWindow"></el-button>
    </div>

  </div>
</template>

<script>
  import { ipcRenderer } from 'electron';
  export default {
    name: 'AppHeaderBar',
    data() {
      return {
        isFull: false,
        platform: process.platform
      }
    },
    methods: {
      btnBlur(evt) {
        let target = evt.target;
        if(target.nodeName == "SPAN"){
            target = evt.target.parentNode;
        }
        target.blur();
      },
      minWindow(e) {
        this.btnBlur(e);
        ipcRenderer.send('minWindow');
      },
      maxWindow(e) {
        this.btnBlur(e);
        ipcRenderer.send('maxWindow', {isFull: this.isFull});
        this.isFull = !this.isFull;
      },
      closeWindow(e) {
        this.btnBlur(e);
        ipcRenderer.send('closeWindow');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .home-header {
    -webkit-app-region: drag;
    width: 100%;
    height: 55px;
    margin-bottom: 5px;
    &-tools {
      top: 0; right: 0;
      &-item {
        width: 27px;
        height: 18px;
        line-height: 18px;
        font-size: 8px;
        color: $color-font;
        background-color: #BDD6FF;
        margin: 0 0.5px;
        &:last-child {
          margin-right: 0;
        }
      }
      &-item:hover {
        background-color: #8AB7FF;
      }
    }
  }
</style>