<template>
  <div id="Dialog" :class="{'dialog-padding':platform === 'win32'}">

    <div class="dialog-box width-full height-full flex flex-column" :class="{'dialog-shadow':platform === 'win32'}">

      <header-bar :title="title"></header-bar>

      <div class="flex-1 height-full">
        <router-view></router-view>
      </div>
      
    </div>

  </div>
</template>

<script>
  import HeaderBar from '@/pages/index/components/HeaderBar';
  import bus from '@/utils/bus';
  export default { 
    name: 'Dialog',
    components: {
      HeaderBar
    },
    data() {
      return {
        platform: process.platform,
        title: ''
      }
    },
    created() {
      this.title = this.$Win.getParameter().title;
      bus.$on('updateDialogTitle', title => {
        this.title = title;
      });
    }
  }
</script>

<style lang="scss" scoped>
  #Dialog {
    width: 100%;
    height: 100%;
    background-color: transparent;
    .dialog-box {
      background-color: $color-white;
    }
    .dialog-shadow {
      box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.3);
    }
  }
  .dialog-padding {
    padding: 10px;
  }
</style>