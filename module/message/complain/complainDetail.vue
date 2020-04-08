<template>
  <view class="page">

    <view class="complain">
      <view class="title">投诉对象</view>
      <view class="user">
        <image class="avatar" :src="complain.headImage"></image>
        <text class="name">{{ complain.name }}</text>
      </view>

      <view class="complain-type">{{ complain.type }}</view>
      <view class="complain-content">{{ complain.content }}</view>
      <view class="image-list">
        <image v-for="image in complain.images" :src="image" @click="previewImage(image)"></image>
      </view>

    </view>

  </view>
</template>

<script>
  export default {
    name: "complainDetail",

    data () {
      return {
        complain: {
          images: [],
        }
      }
    },

    onLoad (option) {
      const id = option.id;
      this.$api.getMemberComplainDetail(id).then(result => {
        this.complain = result;
      }).catch(error => {
        this.showError(error);
      })
    },

    methods: {
      previewImage (item) {
        uni.previewImage({
          current: item,
          urls: this.complain.images,
        });
      },
    }

  }
</script>

<style scoped lang="less">

  .page {
    background-color: #f5f5f5;
    min-height: 100vh;
    padding: 30upx;
    box-sizing: border-box;
  }

  .complain {
    padding: 30upx;
    background-color: #ffffff;

    .title {
      font-size:32upx;
      font-weight: bold;
      color:rgba(51,51,51,1);
      line-height:45upx;
      margin-bottom: 23upx;
    }
    .user {
      display: flex;
      align-items: center;
      padding-bottom: 40upx;
      border-bottom: 1upx solid #EEEEEE;
      margin-bottom: 32upx;

      .avatar {
        width:80upx;
        height:80upx;
        margin-right: 25upx;
      }
      .name {
        font-size:32upx;
        color:rgba(51,51,51,1);
        line-height:80upx;
      }
    }

    .complain-type {
      font-size:32upx;
      font-weight: bold;
      color:rgba(51,51,51,1);
      line-height:45upx;
      margin-bottom: 14upx;
    }
    .complain-content {
      font-size:28upx;
      color:rgba(51,51,51,1);
      line-height:42upx;
      margin-bottom: 20upx;
    }
    .image-list {
      display: flex;
      flex-wrap: wrap;


      image {
        width:196upx;
        height:190upx;
        margin-right: 20upx;
        margin-bottom: 20upx;

        &:nth-child(3n) {
          margin-right: 0;
        }

      }
    }

  }

</style>