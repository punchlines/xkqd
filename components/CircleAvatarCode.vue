<template>
  <view class="circle-avatar">
    <image class="avatar" v-if="avatar" :src="avatar" />
    <view class="avatar-container" v-else>
      <image v-for="image in images" :src="image" />
    </view>
  </view>
</template>

<script>
  export default {
    name: "CircleAvatar",

    props: {
      images: Array,
      avatar: String,
    },

  }
</script>

<style scoped lang="less">

  .circle-avatar {
    width:102upx;
    height:102upx;

    .avatar {
      width: 100%;
      height: 100%;
    }


    .avatar-container {
      width: 100%;
      height: 100%;
      display: flex;
      box-sizing: border-box;
      flex-wrap: wrap;
      background:rgba(241,241,241,1);
      align-items: start;
      padding: 5upx;

      image {
        width: 42upx;
        height: 42upx;
        margin-right: 10upx;
        margin-bottom: 5upx;

        &:nth-child(even) {
          margin-right: 0;
        }

      }

    }

  }

</style>