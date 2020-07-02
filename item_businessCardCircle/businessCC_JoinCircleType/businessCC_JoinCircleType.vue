<template>
	<view class="joinTypeContainer">
    <view class="selectTitle">请选择加社群方式：</view>


      <view class="selectInfo"
            v-for="(item,index) in typeList"
            :key="index"
            @click="select(index)"
            :class="{ active: item.id === currentSelect.id }">
        {{ item.text }}
      </view>

      <view class="moneyContainer" v-if="isPay">
        <text class="money">金额(元)</text>
        <input class="monNumber" placeholder="0.00" v-model="price" type="digit" />
      </view>
	  
	  <view class="moneyContainer" v-if="isPay">
	    <text class="money">邀请佣金(元)</text>
	    <input class="monNumber" placeholder="不能大于进群金额" v-model="percent" type="digit" />
	  </view>
	  
	<view  class="moneyContainers" v-if="isPay">
		
			<p>注：1.邀请佣金不能高于入群支付金额的30%，例：入</p><p style="margin-left: 80rpx;">社群支付10元，则邀请者的佣金不能超过3元.</p>
			<p style="margin-left: 56rpx;">2.“入群支付金额”与“邀请者佣金”，请到“我的-我的钱包里面查询”</p>    
			  <p style="text-align: center;">(邀请佣金：群友邀请其他人员进群成功所获得的奖励)</p> 
	</view>
    <view class="sure" @click="confirm">
      <text class="text">确定</text>
    </view>
  </view>
</template>

<script>
  export default {

    data() {
      return {
        onlineSite:this.global.onlineSite,
        currentSelect: {},
        price: '',
		percent:0,
		circleId:'',
        typeList: [
          { id: 1, text: '允许任何人加社群' },
          { id: 2, text: '消息验证并由管理员审核' },
          { id: 3, text: '只允许社群成员邀请' },
          { id: 4, text: '付费入社群(仅限会员)' }		
      ],
			}
    },

    onLoad (options) {
      this.currentSelect = this.cardCirclePublish.joinType;
      this.price = this.cardCirclePublish.joinMoney;
	  this.percent = this.cardCirclePublish.percent;
	  this.circleId=options.circleId
	  console.log(this.circleId)
			//if(this.currentUser.userType<=1) this.typeList.pop();
    },

    computed: {
      cardCirclePublish () {
        return this.$store.state.cardCirclePublish;
      },
      isPay () {
        return this.currentSelect.id === 4;
      }
			
    },

    methods: {
			select(index){
				this.currentSelect=this.typeList[index];
			},
			
      confirm () {
        if (!this.currentSelect.id) {
          this.showTips('请选择加社群方式');
          return;
        }
        if (this.isPay) {
          if (isNaN(Number(this.price))) {
            this.showError('请输入数字')
            return;
          }
          if (this.price <= 0) {
            this.showError('金额不能小于 0')
            return;
          }
          if (this.price > 299) {
            this.showError('金额不得大于¥299')
            return;
          }
		  
		  if (this.percent < 0) {
		    this.showError('佣金不能小于 0')
		    return;
		  }
		  if (parseInt(this.percent) >= parseInt(this.price)) {
		    this.showError('提成必须小于进群金额')
		    return;
		  }
        }
        this.cardCirclePublish.joinType = this.currentSelect;
        this.cardCirclePublish.joinMoney = this.price;
		this.cardCirclePublish.percent = this.percent;
		if(this.circleId==undefined){
			uni.navigateBack();
		}
		else{
			const postData = {
				joinType:this.cardCirclePublish.joinType.id,
				price:this.cardCirclePublish.joinMoney,
				percent:this.cardCirclePublish.percent,
				circleId:this.circleId
			}
			uni.showLoading();	
			this.$api.updateCardCircleDetail(postData).then(result => {
				uni.hideLoading();
				uni.showToast({
					title:'设置成功',
					duration:2000
				})
				
				uni.navigateBack();
			}).catch(error => {
				uni.hideLoading();
				this.showError(error)
			})
		}
		
        
      },
    },

  }
</script>

<style lang="less">
@import "../../css/jss_base.less";
.joinContainer{
  width: 100%;
}
.joinTypeContainer{
  margin: 0 auto;
  @ff:PingFangSC-Regular;
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  .selectTitle{
    padding-top: 30rpx;
    font-family: PingFangSC-Medium;
    color: @title;
    font-weight: 500;
  }
  .selectInfo {
    width: 100%;
    height: 104rpx;
    line-height: 104rpx;
    font-size: @fsSubTitle;
    font-family: @ff;
    color: @title;
    position: relative;
	
    &+.selectInfo {
      border-top: 1px solid #eeeeee;
    }

    &.active {
      &:after {
        content: "";
        width: 28upx;
        height: 22upx;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        background-image: url("http://card-1254165941.cosgz.myqcloud.com/cardImages/images/select.png");
        background-size: 100% 100%;
      }

    }

  }
  .activity{
    color: #6b7af8;
    position: relative;
    .selectImg{
      width: 28rpx;
      height: 22rpx;
      position: absolute;
      right: 30rpx;
      top: 41rpx;
    }
  }
  .moneyContainer{
    margin-bottom: 40rpx;
    height: 106rpx;
    line-height: 106rpx;
    background: #f8f8f8;
    border-radius: 2px;
    display: flex;
    align-items: center;

    .money{
      font-size: @fsSubTitle;
      color: @title;
      padding-left: 30rpx;
    }
    .monNumber{
      flex: 1;
      text-align: right;
      font-size: 28upx;
      padding-right: 30rpx;
      color: #333;
      font-family: PingFangSC;
    }
  }
  .sure{
		margin: 0 auto;
    width: 686rpx;
	background-color: #2EA1FF;
	height: 88rpx;
	border-radius: 44rpx;
    line-height: 88rpx;
    margin-top: 100rpx;
    text-align: center;
    .text{
      font-family: @ff;
      color: #ffffff;
    }
  }
}
.moneyContainers{
	margin-top: 20rpx;
	margin-bottom: 40rpx;
	background: #f8f8f8;
	border-radius: 2px;
	color: #9999;
	font-size: 14px;
}
</style>
