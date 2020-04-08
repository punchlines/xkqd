<template>
	<view class="container">
		<view class="deleteCard">
			<!-- <view class="DCname">长按可删除银行卡</view> -->
		</view>
		<view class="CardList">
			<view class="CLname" v-for="(item,index) in bankCartList" :key="index"  :class="item.card_class">
				<view class="CLtitle fsf28">
					{{item.bankName}} 
					<!-- <text class="CLsubTitle fsf24">{{ item.card_type }}</text> -->
				</view>
				<view class="CLcardNum fx-row fx-row-center fx-row-space-around">
					<view class="CNnum" v-for="(ite,ind) in item.sliceString" :key="ind">{{ite}}</view>
				</view>

			<!-- 	<view class="deleteMask">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/shanchu4.png'" />
				</view> -->

			</view>
		</view>

		<view class="load-more-text">{{ loadMoreText }}</view>

		<!-- 添加银行卡 -->
		<!-- <view class="addCard" @click="addNewCard">
			<view class="ACcard fs3a32">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/add.png'"></image>添加银行卡
			</view>
		</view> -->
	</view>
</template>

<script>

  import loadMoreMixins from '../../js/mixins/loadMoreMixins'
  import {mapState} from 'vuex';
  const CARD_TYPE_MAP = {
    DC: "储蓄卡",
    CC: "信用卡",
    SCC: "准贷记卡",
    PC: "预付费卡"
  }

	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				cardList:[
					{id:0,bankName:'中国农业银行',cardStyle:'储蓄卡',cardNum:'6228622862286228123',sliceString:[]},
					{id:1,bankName:'中国建设银行',cardStyle:'储蓄卡',cardNum:'6228622862286228123',sliceString:[]},
					{id:2,bankName:'交通银行',cardStyle:'储蓄卡',cardNum:'6228622862286228123',sliceString:[]},
					{id:3,bankName:'中国工商银行',cardStyle:'储蓄卡',cardNum:'6228622862286228123',sliceString:[]},
					{id:4,bankName:'中国银行',cardStyle:'储蓄卡',cardNum:'6228622862286228123',sliceString:[]}
				],
				touchStart:'',
				touchEnd:'',
				bankCartList: [],
				getParam:'',//获取从哪个页面过来的参数

			};
		},

	  filters: {

	  },
	  
	  computed: {
	
	  },

	  mixins: [loadMoreMixins],

	  onShow () {
		  this.currentPage = 1;
		  this.bankCartList = [];
		  this.noMore = false;
		  this.fetch();
	  },

		methods:{
		  fetch () {
            this.$api.getBankList(this.currentPage).then(result => {
              const list = result.bankCartList;
              for(var i of list){
                i.sliceString=['****','****','****',i.bankCardNo.slice(i.bankCardNo.length - 4, i.bankCardNo.length)];
                // i.card_type = this.formatCardType(i.card_type);
				i.card_class = this.getCardClass(i);
              }
              this.bankCartList = this.bankCartList.concat(list)
              this.currentPage += 1;
              this.loadMoreLoading = false;
              if (list.length === 0) {
                this.noMore = true;
              }
            })
		  },
          formatCardType (type) {
            return CARD_TYPE_MAP[type];
          },
			deleteCard(item){
			  const postDelete = () => {
                uni.showLoading({ title: '请求中', mask: false });
                this.$api.removeBankCard(item.id).then(result => {
                  this.bankCartList = [];
                  this.reset();
                  this.fetch();
                  uni.hideLoading();
				}).catch(error => {
                  uni.hideLoading();
                  this.showError(error);
				})
			  }

              uni.showModal({
                title: '提示',
                content: '是否删除该银行卡？',
                success: function (res) {
                  if (res.confirm) {
                    postDelete();
                  }
                }
              });
			},


		  getCardClass (item) {
		    const CARD_CLASS_MAP = {
		      "农业银行": 'ABC',
		      "中国农业银行": 'ABC',
		      "工商银行": 'ICBC',
		      "中国工商银行": 'ICBC',
              "建设银行": 'CCB',
              "中国建设银行": 'CCB',
		      "交通银行": 'COMM',
		      "中国交通银行": 'COMM',
			};

		    return CARD_CLASS_MAP[item.bankName]
		  },

			// 添加银行卡
			addNewCard(){
				
				
				uni.navigateTo({
					url: '../../item_businessCard/businessCard_BindBankcard/businessCard_BindBankcard?from='+this.getParam
				});
			},
		},
		onLoad(e) {
			this.getParam=e.from
		}
	}
</script>

<style lang="less">
  @import '../../css/mzl_base.less';

  page{width:100%;height: 100%;background:@grayBg;}
  .bgCard(@lg:linear-gradient(90deg,rgba(18,170,149,1) 0%,rgba(23,206,176,1) 100%)){
	  width:100%;height:200upx;margin:30upx 0
  ;padding:40upx;

	  border-radius:20upx 20upx 0 0;
  }
  .container{
	  padding-bottom:120upx;
	.deleteCard{
		width:100%;height:64upx;line-height: 64upx;text-align: center;background:#FFFBCE;
		.DCname{font-size:24upx;color:#FF7A2A;}
	}
	.CardList{
		margin-top:40upx;padding:0 30upx;
		.CLname{
			.bgCard();
			.CLtitle{
				font-size:30upx;height:70upx;
				.CLsubTitle{margin-left:30upx;}
			}
			.CLcardNum{
				color:#fff;font-size:42upx;width:100%;
				.CNnum{width:20%; line-height: 20upx }
			}



			&:nth-child(1n+1) {
				background: linear-gradient(90deg,rgba(247,73,94,1) 0%,rgba(251,104,104,1) 100%);
			}
			&:nth-child(2n+2) {
				background: linear-gradient(90deg,rgba(252,96,118,1) 0%,rgba(255,154,68,1) 100%);
			}
			&:nth-child(3n+3) {
				background: linear-gradient(90deg,rgba(238,159,90,1) 0%,rgba(244,178,102,1) 100%)
			}

			&.ABC {
				background:linear-gradient(90deg,rgba(18,170,149,1) 0%,rgba(23,206,176,1) 100%);
			}
			&.CCB {
				background:linear-gradient(270deg,rgba(58,136,240,1) 0%,rgba(91,122,255,1) 100%,rgba(91,122,255,1) 100%);
			}
			&.COMM {
				background:linear-gradient(90deg,rgba(108,109,217,1) 0%,rgba(108,132,245,1) 100%);
			}
			&.ICBC {
				background:linear-gradient(90deg,rgba(226,64,75,1) 0%,rgba(245,111,83,1) 100%);
			}

		}
	}
	.addCard{
		width:100%;height:100upx;background:#fff;border-top:1upx solid #eee;position:fixed;bottom:0;
		.ACcard{
			.buttonRadius();color:#fff;margin:10upx auto;

			height: 80upx;
			line-height: 80upx;
			image{width:32upx;height: 32upx;vertical-align: middle;margin-right: 20upx;}
		}
	}
  }
</style>
