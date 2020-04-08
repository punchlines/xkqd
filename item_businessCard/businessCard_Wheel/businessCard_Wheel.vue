<template>
	  <view class="page container top" :style="{backgroundImage: 'url(http://card-1254165941.cosgz.myqcloud.com/cardImages/card/lunpanbg.png)'}" >
        <view class="count-info">剩余抽奖次数：{{ lotteryNum }}</view>

        <view class="roulette fx-row fx-row-center" :style="{backgroundImage: 'url(http://card-1254165941.cosgz.myqcloud.com/cardImages/card/lunpandii.png)'}" >
      <view class="Rlist fx-row fx-row-center">
          <view class="Rcenter">
						<image @click="Begin" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/begin.png'"></image>
            <!-- <view class="Rtitle fsf28">开始</view> -->
          </view>
          <view :class="{'Rprize':true,'rout':showR==true}" :style="rotateStyle">

            <view  :style="bgCenter" class="bg"></view>

            <view :class="{'fs3a28 RPitem':true,'RPitem0':index==0,'RPitem1':index==1,'RPitem2':index==2,'RPitem3':index==3,
								'RPitem4':index==4,'RPitem5':index==5,'RPitem6':index==6,'RPitem7':index==7}" v-for="(item,index) in lotteryList" :key="index">
              <!--<view>{{item.id}}</view>-->
              <view class="RPtitle" @click="Begin">{{item.name}}</view>
            </view>
          </view>
      </view>
    </view>
    <view class="rouletteChance">
      <view class="RCtitle">获取抽奖机会</view>
      <view class="RCitemlist fx-row fx-row-center fx-row-space-around" v-for="(item,index) in RgetChence" :key="index">
        <view class="RCitem fs3a28"><text class="pot"></text>{{item.title}}</view>
        <view class="Rgoto">
          <view class="Rtitle" @click="handleMoreClick(index)">现在去</view>
        </view>
      </view>
    </view>

        <prize-modal ref="prizeModal" @next="Begin"></prize-modal>

        <template-modal ref="templateModal"></template-modal>



      </view>
</template>

<script>



  import PrizeModal from "./PrizeModal";
  import TemplateModal from "./TemplateModal";
  export default {
    components: {PrizeModal, TemplateModal},
    data() {
      return {
        onlineSite:this.global.onlineSite,
        isCancel:true,//是否取消积分兑换
        lotteryList:[
          {id:1,num:'¥5',title:'优惠券'},
          {id:2,num:'+5',title:'积分'},
          {id:3,num:'¥20',title:'优惠券'},
          {id:4,num:'',title:'什么都没有'},
          {id:5,num:'',title:'中国风名片模版'},
          {id:6,num:'¥10',title:'优惠券'},
          {id:7,num:'',title:'科技风名片模版'},
          {id:8,num:'+1',title:'抽奖机会'}
        ],
        RgetChence:[
          {id:0,title:'分享名片，+1次抽奖机会'},
          {id:1,title:'购买商品，+1次抽奖机会'},
          {id:2,title:'积分兑换，50积分+1次抽奖机会'}
        ],
        bgCenter:"background-image: url('"+this.global.onlineSite +"http://card-1254165941.cosgz.myqcloud.com/cardImages/card/neirongqu.png');background-size: 100%;background-repeat: no-repeat;",
        // 轮盘旋转参数
        showR:false,
        divide: 90, // 平分度    注：必须修改
        speed: 0, // 转的幅度 默认匀速 最好为两个角度间 90/10  的十分之一  注：必须修改
        deg: 0, // 记录转动后的角度 可大于360
        rotate: 0, // 在360度内 最后指针停下的角度
        //   endrotate: false, // 传入endrotate
        isAllowClick: true, // 转动转盘的开关
        isAllowClick2: true, // 转动转盘的开关
        time: 100,

        timer: 0,
        start: false,
        currentRotate: 0,
        animation: false,
        lotteryNum: 0,
        integral: 0,
        playing: false,

        idMap: {},
      }
    },

    computed: {
      rotateStyle () {
        let style = `transform: rotate(${ this.currentRotate }deg);`;
        if (this.animation) {
          return style + 'transition: 5s;'
        }
        return style;
      },
    },

    onLoad () {
      Promise.all([
        this.$api.getUserLotteryDetail(),
        this.$api.ListLotteryPrize()
      ]).then(results => {
        this.lotteryNum = results[0].lotteryNum;
        this.integral = results[0].integral;
        results[1].lotteryList.forEach((item, index) => {
          item._id = index + 1;
          this.idMap[item.id] = item;
        })
        this.lotteryList = results[1].lotteryList
      })

      this.$nextTick(() => {
        // this.$refs.prizeModal.onLoad();
        this.$refs.templateModal.onLoad();
      })
    },

    methods: {
      Begin(){
        if (this.lotteryNum <= 0) {
          this.showTips('抽奖次数已用完');
          return;
        }
        if (this.start || this.playing) {
          return;
        }

        this.startRotate();

        this.$api.getLotteryPrize().then(result => {
          this.lotteryNum--;
          this.start = false;
          clearInterval(this.timer)
          this.playing = true;
          // 抽中奖品 id
          const id = this.idMap[result.lotteryId]._id;
          const rotate = this.currentRotate;
          const rotate360 = rotate - ~~(rotate / 360) * 360;

          let index = 1;
          if (rotate360 - 22.5 <= 0) {
            index = 1;
          } else {
            index = 8 - ~~((rotate360 - 22.5) / 45);
          }

          const plus = ((index - id ) * 45) + 360 * 6;
          this.animation = true;
          this.currentRotate += plus;

          setTimeout(() => {
            this.playing = false;
            this.showModal(result.lotteryResult);
          }, 5000)

        }).catch(error => {
          this.showTips('请检查网络是否已连接');
          this.animation = false;
          this.currentRotate = 0;
          this.start = false;
          clearInterval(this.timer)
        })
      },

      startRotate () {
        this.start = true;
        this.timer = setInterval(() => {
          this.currentRotate += 24;
        }, 16)
      },

      showModal (lotteryResult) {
        // 积分
        if (lotteryResult.type == 2) {
          this.$api.getUserLotteryDetail().then(result => {
            this.integral = result.integral
          })
        }
        // 模板
        if (lotteryResult.type == 3) {
          this.$refs.templateModal.show();
        } else {
          this.$refs.prizeModal.show(lotteryResult);
        }
        // 抽奖次数
        if (lotteryResult.type == 4) {
          this.lotteryNum++;
        }
      },

      handleMoreClick (index) {
        if (index === 0) {
          uni.navigateBack();
        } else if (index === 1) {
          uni.navigateBack();
        } else if (index === 2) {
          this.exchangePoint();
        }
      },

      exchangePoint () {
        const post = () => {
          uni.showLoading();
          this.$api.addLotteryNum().then(result => {
            uni.hideLoading();
            if (result.ERROR) {
              this.showTips('积分不足');
              return;
            }
            uni.showToast({
              title: '兑换成功',
              duration: 2000
            });
            this.lotteryNum++;
          }).catch(error => {
            this.showError(error);
            uni.hideLoading();
          })
        }

        uni.showModal({
          title: '提示',
          content: '确认消耗50积分，兑换1次抽奖机会吗？',
          success: function (res) {
            if (res.confirm) {
              post();
            }
          }
        });
      },

    }
  }
</script>

<style scoped lang="less">

  .count-info {
    font-size:28upx;
    color:rgba(255,255,255,1);
    line-height:40upx;
    position: absolute;
    top: 30upx;
    left: 30upx;
  }

	@import '../../css/mzl_base.less';
	.page{width:100%;height:100%;background:#f1044d;min-height: 100vh}
	.container{

		background-size: 100%;background-repeat: no-repeat;background-size:cover;
    width:100%;height:1320upx;position: relative;
		background-size: cover;-moz-background-size:cover;-webkit-background-size:cover;-o-background-size:cover;
   .roulette{
		 background-size: 100%;background-repeat: no-repeat;
     width:100%;height:750upx;margin-top:60upx;position: relative;
      .Rlist{
        width:80%;height:600upx;margin:0 auto;  
        .Rcenter{
          z-index: 99;
            width:100upx;height: 164upx;text-align: center;position: absolute;top:50%;left:50%;margin-left:-50upx;margin-top:-110upx;
						image{width:100upx;height: 164upx;}
						.Rtitle{
              line-height: 100upx;margin-top:60upx;z-index:9;position: absolute;top:0;left:25upx
            }
        }
        .Rprize{
          width:80%;height:600upx;position:absolute;margin:0 auto;
					box-sizing: border-box;
					.RPitem{
						width:50%;height:80upx;margin:0 auto;text-align:center;position:relative;
						.RPtitle{width:150upx;margin:0 auto;}
					}
					.RPitem:nth-of-type(2n){color:#D2722F;}
					.RPitem0{top:30upx;left:0;}
					.RPitem1{.route(@deg:45deg);top:20upx;left:160upx;}
					.RPitem2{.route(@deg:90deg);top:110upx;left:220upx;}
					.RPitem3{.route(@deg:135deg);top:190upx;left:170upx;}
					.RPitem4{.route(@deg:180deg);top:140upx;left:0upx;}
					.RPitem5{.route(@deg:225deg);top:0upx;left:-150upx;}
					.RPitem6{.route(@deg:270deg);top:-220upx;left:-220upx;}				
					.RPitem7{.route(@deg:315deg);top:-440upx;left:-140upx;}
        }
      }
   }
   .rouletteChance{
     width:90%;height: 373upx;margin:0 auto;background: #fff;border-radius:10upx;margin-top:50upx;
	 padding:40upx;border:1upx solid red;
     .RCtitle{color:#000;font-size: 32upx;font-weight: bold;margin-bottom:30upx;}
     .RCitemlist{
       .RCitem{width:80%;line-height:80upx;text-align: left;list-style:red;
			.pot{width:10upx;height:10upx;border-radius:50%;background:#6B7AF8;opacity:0.6842;display: inline-block;vertical-align: middle;margin-right:20upx;}
		}
       .Rgoto{
         .Rtitle{font-size:24upx;color:#6B7AF8;.buttonRadius(@w:120upx,@h:54upx,@bg:none);border:1upx solid #6B7AF8;box-sizing: border-box;height: 52upx;}
       }
     }
   }


	
	.rout {

		transform-origin:center;
	}	

}

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
</style>
