<template>
  <div class="page flex flex-column">

    <app-header-bar></app-header-bar>

    <div class="flex-1 width-full height-full flex flex-ai-center flex-jc-center">

      <el-button @click="openDialog(534, 273, '/Dialog', {title: '子窗口'}, 'first', null, false)">子窗口</el-button>
      
    </div>

  </div>
</template>

<script>
  import AppHeaderBar from '@/pages/index/components/AppHeaderBar';
  import { dialogFunc } from '@/pages/index/mixins/dialogFunc';
  export default {
    name: 'Home',
    components: {
      AppHeaderBar
    },
    mixins: [ dialogFunc ]
  };
</script>

<style lang="scss" scoped></style>