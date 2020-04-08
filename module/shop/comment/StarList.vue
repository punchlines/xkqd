<template>
  <view class="star-list">
    <view class="star_item star" v-for="n in starNumber"></view>
    <view class="star_item" v-for="n in emptyStarNumber"></view>
  </view>
</template>

<script>
  export default {
    name: "StarList",

    props: {
      value: Number,
    },

    computed: {
      starNumber () {
        return ~~this.value;
      },
      emptyStarNumber () {
        return 5 - this.starNumber;
      },
    },

  }
</script>

<style scoped lang="less">

  .star-list {
    display: flex;
    .star_item {
      width: 30upx;
      height: 30upx;
      margin-right: 12upx;
      background-size: 100% 100%;
      background-image: url('data:image/png;base64,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');

      &.star {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAABCZJREFUWAndmclrFEEUxr8a9w01GjdEhmgiGkUEDwEXEEQ9uB28KigBRQ9iVIKK+4pLEC+CICj+Cwpu6MHlIKIHjUjUaBAFTcYtRp2EdPlVMzPMxKmu6nTNjFhQdHfVq/d+9fp1dfVrAcdF3kFfdOE8JFZS9W30xxqxEL9dmom5VObr6kQ9PKwjdBnranTiqGsbwqVCenkoIVt84LRigV88jYsl+JRuinp06+kkNucAKzqJQRCoiwqaPd6Zp+UjDEYb3lJ5ebaB1Hk7j3GxFJ/z9IVucufpz9hI6/mAFdQwxLAlNJ1mgBNPM5YHIok3tDFOY0c1f8EIersG3wNkrLrceDqJWloLAlYwI/GNMe+gRPa0bORK/A6vyTLRgqcVo+ntOfhpIasVie7p91yT7YAVRDkS2KClseyI5GmuGP24YjTRVtzSHrj8fUAFKkQln4JelmieTmAN7cZD2ZaYgGasDzWmh3CvPS0l+uAGXvDlMaWHTpvLFsZ2JWO7y0a4p4wVtLyJ4bytVehmVUfJClTzOLOnwhDXjdT1lFWF10vuV5owAE3cXH016chA+2ttJ70WI5CXgvNQmYIcY1LksL/Vn4iajGSNsaoJ9cer9G5RyGuYRYPnKFhDocwkHEK4UuWR7iEnsUlBP6bW2a40F0HPE7V6mN5kReAIZWK8gj4dakjphc/4MSyv4yTjeXvpeQwEAmf5MbHFf7nwZAfFTxiGlLZb4IwCVhA+tDrhBr2eT+dxdf4PlgYCb01zZaBVAzt28uD8QzRtrFdHgVN06LbssTnQqoMCu+nxw9lCJTw/kQrdHIS/oFUvBfcwcA7mSBb7QuCYH7J57OaFVnJiMfbR4/vzjCl8k8AROm6XzpDxtS1v0OteUb1+iB7eqwNW7UZoJcR1fDfX8cLHOe8sPXxA2QwqdtAqp5HAj4JvqEZguM3Xujamc2aawLSCAyuD7ZieY1dzYQcNzNCMd9ss7ezYQle7pdNok/wasij/GrTVHbWFtlJm4SSTiJWnjauHvMfk4Y/o+TcTbaZ/CMrEfOb9AorZ07/s4izARriupPlhNEN7RYa2sGeGVvmNsEXgCt+1yznsatihlDfas4G2fwgF7nN3OI+v4uWsV7iHWMZ/XQs4gQfW8J6L8LCYOaGesa4g6DzuDu9nA4pFuMv2uUyirWJ7Y3af5tzo6cDVQ95lIrwj8D9JC2H3YTEuC8G9oKEw/xfDTazlluAA6yStuMBYTlT7Nyw4PDowSqO4jbB1mIypVH7JBljpUXK8ExeZ6q0i/jbqSGj0l2na/eZgT79kSrAZz+mVipR0B88b+O/klM1uLMiw6vMTmx4zAdL/aB2csvGGebvp6bxdPh2B0L7iWwTuxkYqTvChusgY/ZhPUZQ2Jj/H8adpLXUMZL3Au6d+Ov1f5Q9zeuAXbOU/HQAAAABJRU5ErkJggg==');
      }

    }
  }

</style>