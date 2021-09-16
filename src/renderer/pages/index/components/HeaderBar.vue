<template>
    <div class="title-bar relative">

      <div>{{title}}</div>
      
      <el-button v-if="platform === 'win32'" class="windows-close absolute iconfont icon-guanbi" @click="winClose"></el-button>

      <el-button v-else class="mac-close absolute" @click="winClose">
        <div class="mac-close-icon iconfont icon-guanbi"></div>
      </el-button>

    </div>
</template>

<script>
  export default {
    name: 'HeaderBar',
    data() {
      return {
        platform: process.platform
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      winClose() {
        this.$Win.closeWin();
      }
    }
  }
</script>
<style lang="scss" scoped>
  .title-bar {       
    -webkit-app-region: drag;
    width: 100%;
    height: 40px;/*no*/
    border-bottom: 1px solid #E0E0E0;/*no*/
    padding: 0 27px;/*no*/
    line-height: 40px;/*no*/
    color: $color-font;
    font-size: 12px;/*no*/
  }
  .windows-close {
    -webkit-app-region: no-drag;
    top: 0; right: 0;
    padding: 0 15px;/*no*/
    font-size: 12px;/*no*/
    line-height: 40px;/*no*/
    color: $color-font;
    &:hover {
      color: $color-theme;
    }
  }
  .mac-close {
    -webkit-app-region: no-drag;
    right: 10px;/*no*/top: 0;bottom: 0;
    margin: auto 0;
    width: 16px;/*no*/
    height: 16px;/*no*/
    text-align: center;
    line-height: 16px;/*no*/
    border-radius: 50%;
    background-color: #FA5353;
    font-size: 6px;/*no*/
    font-weight: bold;
    color: $color-font;
    &:hover {
      background-color: #FA5353;
      .mac-close-icon {
        display: block;
      }
    }
    &-icon {
      display: none;
    }
  }
</style>
