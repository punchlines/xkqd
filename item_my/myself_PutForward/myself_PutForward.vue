<template>
	<view class="container">
		<!-- 提现金额 -->
		<view class="PutForwardBox">
			<view class="PutForward">
				<view class="PFtitle fs6a28">提现金额</view>
				<view class="PFinput">
					<view class="text">¥</view><input type="number" focus v-model="totalMoney"/>
				</view>
				<view class="PFnowMoney fx-row fx-row-center fx-row-space-around">
					<view class="NMmoney fs6a24">当前金额：{{allMoney}}元  可提现：{{yuMoney}}元</view>
					<view class="Allforward fs9a24" @click="allGetMoney">全部提现</view>
				</view>
			</view>
		</view>
		<!-- 到账银行 -->
		<view class="AccountToBank">
			<view class="ATBlist fx-row fx-row-center fx-row-space-around"  @click="showBankCard">
				<view class="Bbank fs3a28">到账银行卡</view>
				<view class="BbankName fs6a28" v-if="selectCard">{{ selectCard.title }}</view>
				<view class="BbankName fs6a28" v-else>请选择银行卡</view>
				<view class="BbankImage">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'"></image>
				</view>
			</view>
		</view>
		<!-- 最少提现100 -->
		<view class="forwardMoney fs6a24">*最少提现20元，手续费1元/笔，3个工作日内到账</view>
		<!-- 提现按钮 -->
		<view class="forwardButton">
			<view class="Button" @click="PutForwardMoney">提现</view>
		</view>
		<!-- 弹出层 -->
		<view class="container3" v-show="showItem[0].show">
			<view class="popup fs3a28">
				<!-- 退款原因 -->
				<view class="RefundReson fs6a28" v-show="showItem[1].show">
					<view class="RReason">
						<view class="ReasonTitle fs3a32">到账银行卡</view>
					</view>
					<view class="ReasonList">
						<view @click="selectBankCard(item)" class="Litem" v-for="(item,index) in PutForward" :key="index">{{item.title}}</view>
					</view>
				</view>
				<!-- 支付密码  TODO-->
				<view class="PagePassward" :style="{'margin-top':isFocus?'-300rpx':'-245rpx'}" v-show="showItem[2].show">
					<view class="PPbox">
						<view class="Ptitle fs3a32">支付密码</view>
						<view class="pSubTitle fs6a24">
							<view v-if="modalType === 0">
								首次提现需设置支付密码，设置密码后如需修改请前往<text class="bold">“设置-支付密码”</text>修改
							</view>
							<view v-else>
								为了您的账户安全，请输入支付密码
							</view>

						</view>
						<view class="Ppassward ">
							<view class="PW fx-row fx-row-center fx-row-space-around"  @click="isFocus = true">


								<input :disabled="true" maxlength="1" v-for="(n, index) in 6" :key="n" :value="password[index]" type="password" />

								<input type="number" class="actualInput" v-model="password" maxlength="6" :focus="isFocus" @blur="isFocus = false" />

							</view>
						</view>
						<view class="Pbutton">
							<view class="PBbtn fsf28" :class="{'disable':isPutForwarding}" @click="agreePw">确定</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
  import MD5 from "../../js/md5.js" // md5加密
	const MODAL_TYPE_ADD   = 0;  // 新设置
	const MODAL_TYPE_INPUT = 1;  // 输入

  export default {
    data() {
      return {
		onlineSite:this.global.onlineSite,
        // 银行的种类
        PutForward:[
        ],
        selectCard: null,
		isPutForwarding:false,
        // 当前金额
        allMoney:0,
		// 可提现余额
		yuMoney:0,
        // 全部提现的金额
        totalMoney:0,
        // 弹出层的显示隐藏
        showItem:[
          {id:0,show:false},
          {id:1,show:false},
          {id:2,show:false}
        ],
		account:0,
        password: '',
        confirmHold:false,//键盘收起

		modalType: MODAL_TYPE_ADD,
		isSetPassword: false,

        isFocus: false,
      };
    },

    watch: {
      password () {
        if (this.password.length === 6) {
          this.isFocus = false;
          uni.hideKeyboard()
        }
      }
    },


    async onLoad (options) {
	
		let {status} = await  this.$api.testUpPassword('000000');
		this.isSetPassword = Number(status) !== -1;
		// let {remainMoney} = await this.$api.getRemainMoney();
		this.account = options.account;
		
		this.allMoney = this.account==0?options.nowMoney:options.collectionMoney;
			
		if(this.allMoney>1){
			this.yuMoney = this.allMoney-1
		}else{
			this.yuMoney = 0
		}   
    },

	onShow () {
      this.$api.getBankList().then(result => {
        const list = result.bankCartList;
        list.forEach(item => {
          item.title = `${item.bankName}（${item.bankCardNo.slice(item.bankCardNo.length - 4, item.bankCardNo.length)}）`;
        })
        // list.push({ id: -1, title: '使用新卡' })
        this.PutForward = list;
      });
	},

    methods:{
      // 选择银行卡弹出层
      showBankCard(){
        for(var i of this.showItem){
          i.show=false;
        }
        this.showItem[0].show=true;
        this.showItem[1].show=true;
      },
      // 选择银行
      selectBankCard(card){
        for(var i of this.showItem){
          i.show=false;
        }
        if(card.id == -1) {
          uni.navigateTo({
            url: '/item_businessCard/businessCard_BindBankcard/businessCard_BindBankcard?from=1'
          });
        } else {
          this.selectCard = card;
        }
      },
      // 全部提现
      allGetMoney(){
		  if(this.allMoney>1){
			  this.totalMoney=this.yuMoney;
		  }else{
			  this.showTips('当前余额小于1');
		  }
			
        
      },
      // 确定提现
      PutForwardMoney(){
        const money = Number(this.totalMoney);
        if (!money || money < 0) {
          return this.showError('请输入有效的提现金额');
				}
				

		if (!money || money < 0) {
          return this.showError('请输入有效的提现金额');
		} 
		// if (money < 20) {
  //         return this.showError('提现金额不能小于 20 元');
		// }
        if (money > this.yuMoney) {
          return this.showError('提现金额不能大于最大可提现金额');
		}
		if (!this.selectCard) {
          return this.showError('请选择要提现到账的银行卡');
		}

		// 如果未设置过支付密码
        for (var i of this.showItem) {
          i.show = false;
        }
        this.showItem[0].show = true;
        this.showItem[2].show = true;
        this.modalType = this.isSetPassword ? MODAL_TYPE_INPUT : MODAL_TYPE_ADD;
      },
      // 确认支付密码,跳转回我的钱包
			agreePw(){
			if (this.isPutForwarding) {
				return false;
			}
				
		if (this.password.length !== 6) {
		  return this.showError('请输入密码');
		}
		// 如果是新增密码的情况下
		if (this.modalType === MODAL_TYPE_ADD) {
          this.$api.setPassward(MD5.md5(this.password)).then(result => {
            this.postWithdraw()
          }).catch(error => {
            this.showError(error)
			for(var i of this.showItem){
						i.show=false;
			 }
          })
        } else {
			this.$api.testUpPassword(MD5.md5(this.password)).then(result => {
				if (Number(result.status) === 1) {
					this.isPutForwarding = true;
					this.postWithdraw()
				} else {
						this.showError('密码错误，请重新输入');
					
						for(var i of this.showItem){
									i.show=false;
						 }
						 this.password = "";
						 this.isPutForwarding = false;
				
				}
				}).catch(error => {
					
					this.showError(error)
					this.password = "";
					for(var i of this.showItem){
						i.show=false;
					 }
					  this.password = "";
					this.isPutForwarding = false;
					
				})
		}




      },
	  postWithdraw () {
        this.$api.withdrawCashes(this.totalMoney, this.selectCard.card_num,this.selectCard.id,this.account).then(result => {
          for(var i of this.showItem){
            i.show=false;
          }
		  
		    this.password = "";
			
          uni.showToast({
            title:'申请提现成功',
            duration: 1000
          })
					
			this.isPutForwarding = true;
          setTimeout(() => {
            uni.navigateTo({
              url: '../myself_myWallet/myself_myWallet'
            });
		  }, 1000)
		}).catch(error => {
					for (var i of this.showItem) {
						i.show = false;
					}
			this.password = "";
			this.isPutForwarding = false;
			this.showError(error)
		})
	  },
      // 密码输入,自动跳转到下一个输入框
      countNum(e,index){
        // setTimeout(()=>{
        if(e.detail.value){
          if(index==this.PWitem.length-1){
            this.confirmHold=true;
          }else{
            this.PWitem[index+1].isFocus=true;
          }
        }else{
          return;
        }
        // },0)
      },
    }
  }
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	.container{
		background:@grayBg;padding:40upx;height:100%;width:100%;position:fixed;
		// 提现金额
		.PutForwardBox{
			padding:40upx;background: #fff;
			.PutForward{
				.PFinput{
					margin:50upx 0;border-bottom:1upx solid #eee;
					.text{font-size:80upx;color:#333;display:inline-block;}
					input{width:80%;font-size:100upx;vertical-align: bottom;margin-left:50upx;height: auto;display: inline-block;}
				}
				.PFnowMoney{
					.NMmoney{width:50%;text-align:left;white-space: nowrap;}
					.Allforward{width:50%;text-align: right;color:#6B7AF8}
				}
			}
		}
		// 到账银行
		.AccountToBank{
			margin:30upx 0;background: #fff;padding:30upx;
			.ATBlist{
				.Bbank{
					width:30%;text-align: left;
				}
				.BbankName{
					width:55%;text-align: left;
				}
				.BbankImage{
					width:5%;text-align: right;
					image{width:12upx;height: 24upx;vertical-align: middle;}
				}
			}		
		}
		// 最少提现100
		.forwardMoney{padding:20upx 0;}
		.forwardButton{
			margin:80upx auto;
			.buttonRadius(@w:620upx;@h:88upx;);text-align: center;line-height: 88upx;color:#fff;font-size: 32upx;
		}
		// 弹出层
		.container3{	
			z-index:999999;position: fixed;
			.popup{
				width:100%;height:100%;position:fixed;bottom:0;left:0;background:rgba(0,0,0,.5);text-align:center;
				// 退款原因
				.RefundReson{
					width:100%;height: 690upx;background: #fff;position: fixed;bottom: 0;
					.RReason{color:#000;font-weight: bold;padding:40upx;}
					.ReasonList{
						.Litem{
							padding:35upx 30upx;border-bottom:1upx solid #eee;text-align: left;position: relative;
							image{width:28upx;height: 22upx;vertical-align: middle;position: absolute;right:40upx;}
						}
						// .Litem:last-child{border-bottom: none;}
						.LitemActive{color: #6B7AF8;}
					}
				}
				// 支付密码
				.PagePassward{
					width:690upx;height:490upx;padding:30upx;background:rgba(255,255,255,1);border-radius:10upx;text-align: center;
					position: absolute;top:50%;left:50%;margin-left:-345upx;margin-top:-245upx;
					.PPbox{
						.Ptitle{margin:30upx 0;}
						.pSubTitle{margin:20upx 0;line-height:50upx;}
						.Ppassward{
							margin:30upx 0;
							.PW{
								position: relative;
								input{text-align:center;height:auto;border-bottom:2upx solid #666;font-size:64upx;color:#333;display: inline-block;margin-right:10upx;}
							}
						}
						.Pbutton{
							.PBbtn{.buttonRadius(@w:328upx,@h:80upx);margin:0 auto; 
								&.disable{
									background:  rgba(116, 131, 255, 0.5);
								}
							}
						}
					}
				}
			}
		}
	}
	.actualInput {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		z-index: 99;
		transform: translateX(-1000px);
	}
</style>
