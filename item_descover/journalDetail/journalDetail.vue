<template>
  <view class="page">

    <app-share-top-banner></app-share-top-banner>

    <view class="cardCon fx-row fx-row-space-between" @click="openOther">
      <image :src="user.headImage"></image>
      <view class="info fx-column fx-row-space-between">
        <view class="name">{{user.name}}</view>
        <view class="detail">{{user.job}} | {{user.company}}</view>
      </view>
    </view>

    <journal-item v-if="journal" :journal="journal" detail @deleteSuccess="onDeleteSuccess" :is-self="user.id == currentUser.id"></journal-item>

	

    <!-- #ifndef H5 -->
    <view class="footer">
      <view plain="true" class="footer-button left-button" @click="openMySelf">我的名片</view>
      <view plain="true" class="footer-button right-button" @click="openOther">他的名片</view>
    </view>
    <!-- #endif -->

  </view>
</template>

<script>
  import JournalItem from "@/components/JournalItem";
  export default {

    name: "JournalDetail",

    components: { JournalItem },

    data () {
      return {
        journal: null,
        user: {},
      }
    },

    onLoad (option) {
      let id = option.id;
      if (option.scene) {
        const scene = decodeURIComponent(option.scene);
        id = scene.match(/id=(\d+)/) ? scene.match(/id=(\d+)/)[1] || '' : '';
      }
      uni.showLoading();
			//判断登录
			
			this.doLoginHandle(()=>{
					this.init(id);	
			});
    },

    methods: {
			
		
			
			init(id){
				this.showLoading();
				 
				 this.$api.getUserJournal(id).then(result => {
						
						this.user = result.journalUserInfo || {};
						try {
							result.journalMap.images = JSON.parse(result.journalMap.images)
						} catch (e) {
							result.journalMap.images = []
						}
								
						this.journal = result;
						uni.hideLoading();
						console.log(result)
					}).catch(error => {
						uni.hideLoading();
						this.showError(error);
					})
				
			},
			
      openCardDetail(item) {
        uni.navigateTo({
          url: '/pages/businessCard2/businessCard2?cardUserId=' + item.id
        });
      },

      openMySelf () {
        uni.switchTab({url: '/pages/businessCard/businessCard'});
      },
      openOther () {
        if (!this.user.id) {
          this.showError('该用户不存在')
          return;
        }
        this.navigateTo('/pages/businessCard2/businessCard2', { cardUserId: this.user.id })
      },
      onDeleteSuccess () {
				//this.$store.commit('setNeedUpdateDiscovery', false);
        uni.setStorageSync('_deleteJournalFlag', this.journal.journalMap.id);
				uni.navigateBack();
        //uni.switchTab({url: '/pages/businessCard/businessCard'});
      }
    },

  }
</script>

<style scoped lang="less">

  .page {
    width: 100%;
    box-sizing: border-box;
    min-height: 100vh;
    padding-bottom: 100upx;
  }

  .footer {
    position: fixed;
    bottom: 0;
    z-index: 999999;
    width: 100%;
    height: 98upx;
    text-align: center;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;

    .footer-button {
      width:311upx;
      height:80upx;
      line-height:80upx;
      font-size:28upx;
      color:rgba(255,255,255,1);
      border: none;
      margin: 0;
    }
    .left-button {
      background: #4CA5FF;
      border-radius: 44upx 0px 0px 44upx;

      &:active {
        background: #4796ea;
      }

    }
    .right-button {
      background: #6B7AF8;
      border-radius: 0 44upx 44upx 0;

      &:active {
        background: #6270e0;
      }

    }

  }

  .cardCon{
    display: flex;
    width:90%; position: relative;
    background:#FFFFFF;
    box-sizing:border-box;
    padding:20upx 0upx;border-radius: 8upx;margin-left: 30upx;
    image {
      width: 100upx;height: 100upx;margin-right:30upx;}
    .info{
      flex: 1;
      .name{font-size: 32upx;color: #333333;}
      .detail{
        width:100%; font-size: 24upx;color: #999999;
      }
    }
    .collect{position:absolute;top:20upx;right:-20upx; width: 110upx;height: 48upx;
      line-height:48upx;background: #6B7AF8;font-size: 24upx;color: #ffffff;text-align: center;
    }
  }

</style>
