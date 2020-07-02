<template>
	<view class="container">
		<view class="introduceInfo">
			<textarea  @click="focusArea" :disabled="disabled" :focus="focus" @blur="blurArea" placeholder="请输入社群介绍..." maxlength="500" v-model="introduce"></textarea>
			<view class="wordNumber">
				<text>{{ introduce.length }}</text>
				<text>/</text>
				<text>500</text>
			</view>
		</view>
		<view class="button" @click="confirm">
			<text class="text">确定</text>
		</view>
	</view>
</template>

<script>
  export default {

    data() {
      return {
        introduce: '',
		focus:true,
		isManager:'',
		disabled:false,
		circleId:''
      };
    },

    computed: {
      cardCirclePublish () {
        return this.$store.state.cardCirclePublish;
      },
    },

	onLoad (option) {
      this.introduce = this.cardCirclePublish.introduce;
	  this.isManager=option.role
	  this.circleId=option.circleId
	  console.log(option)
	  if(this.isManager==0){
		  this.disabled=true
	  }else{
		  this.disabled=false
	  }
	},

	methods: {
				blurArea(){
			console.log(this.focus)
			this.focus = false;
			this.$forceUpdate();
		},
		
		focusArea(){
			console.log(this.focus)
			this.focus = true;
			this.$forceUpdate();
		},
		
      confirm () {
        this.cardCirclePublish.introduce = this.introduce;
		const postData = {
			introduce:this.cardCirclePublish.introduce,
			circleId:this.circleId
		}
		uni.showLoading();	
		this.$api.updateCardCircleDetail(postData).then(result => {
			uni.hideLoading();
			uni.showToast({
				title:'修改成功',
				duration:2000
			})
			
			uni.navigateBack();
		}).catch(error => {
			uni.hideLoading();
			this.showError(error)
		})
	  },
	},

  };
</script>

<style lang="less">
	@import "../../css/jss_base.less";
.container{
  width: 100%;
  .introduceInfo{
    position: relative;
    width: 92%;
    height: 400upx;
    margin: 30upx auto;
    background: #f8f8f8;
    textarea{
      padding:30upx 0 0 30upx;
      font-weight: 400;
      color: #333333;
      font-size: @fsSubTitle;
      font-family: PingFangSC;
    }

    .wordNumber{
      position: absolute;
      right: 31upx;
      bottom: 25upx;
      color: #999999;
      font-size: @fsNum;
    }
  }
  .button{
    width:686rpx;
    height:94rpx;
    background:rgba(46,161,255,1);
    border-radius:47rpx;
    background-color: #2EA1FF;
    margin: 100upx auto;
    line-height: 94upx;
    text-align: center;
    .text{
      color: #ffffff;
      font-size: @fsContentTitle;
      font-weight: 400;
      font-family: PingFangSC-Regular;
    }
  }
}
</style>
