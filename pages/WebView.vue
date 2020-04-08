<template>
  <view>
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
  export default {
    name: "WebView",

    data () {
      return {
        url: '',
      }
    },

    onLoad (option) {
	
      this.url = decodeURIComponent(option.url);
	  console.log(this.url)
    }

  }
</script>

<style scoped>

</style>