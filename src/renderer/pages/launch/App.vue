<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'electron-vue-template_launch'
  }
</script>

<style lang="scss">
  html, body, #app {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    box-sizing: border-box;
  }
</style>
