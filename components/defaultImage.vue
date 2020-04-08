<template>
	<image :class="customClass" :src="isError ? defaultUrl : src" @error="errorEvent($event)"  mode="aspectFill"  lazy-load></image>
</template>

<script>
  export default {
    name: 'defaultimage',
    data() {
      return {
        isError: false,
      };
    },
    props: {
      src: String,
      defaultUrl: {
        type: String,
        default: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'
      },
      customClass:String,
    },

    watch: {
      src () {
        this.isError = false;
      },
    },

    methods: {
      errorEvent (e) {
        if (!this.src) this.isError = true;
      }
    },
    onLoad() {
  
    }
  }
</script>

<style>
	/* image{width:80upx;height:80upx;vertical-align: middle;} */
</style>
