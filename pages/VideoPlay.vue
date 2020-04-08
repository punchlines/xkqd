<template>
  <view>
    <video :src="videoSrc" controls></video>
  </view>
</template>

<script>
  export default {

    name: "VideoPlay",

    data () {
      return {
        videoSrc: '',
      }
    },

    onLoad (option) {
      this.videoSrc = option.src;
    }

  }
</script>

<style scoped>

  video {
    width: 100vw;
    height: 100vh;
  }

</style>