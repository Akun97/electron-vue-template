<template>
  <div class="launch flex flex-column flex-ai-center flex-jc-center">

    <el-button @click="open">点击进入</el-button>

  </div>
</template>

<script>
  import Elp from 'electron-launch-page';
  export default {
    name: 'Home',
    created() {
      Elp.render.launch();
    },
    methods: {
      open() {
        Elp.render.ready();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .launch {
    width: 100%;
    height: 100%;
    -webkit-app-region: drag;
    background-color: $color-white;
    border-radius: 12px;
  }
</style>