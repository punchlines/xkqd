/**
 * 订单详情页 mixins
 * 
 */

import {formatTime} from "../../js/mzl.js";
import price from '@/components/price.vue';

export default {
	components:{price},
	data() {
			return {
				childId:0,
				Detail:null,
				orderNum:'',
				orderCreateTime:'',//创建时间
				payTime:'',//支付时间,
				payType:0,
				handleTime:'',//发货时间,
				status:-1,
				_status:-1, //订单状态
				completed:false,
				canceled:false//是否已经取消
			};
	},
	computed:{
	
		
		isCOD(){
			return this.payType == 1; 
		},
		isUseCoupon () {
			return this.Detail && this.Detail.discountAmount > 0
		},
		isSO(){ //是否销售订单
			return this.status>=10;
		},
			
		updateFlag(){
			return this.isSO?'_needUpdateSaleOrder':'_needUpdateShopOrder'
		}
	},
	onLoad(e) {
		console.log(e.childId);
		this.childId=e.childId;
		this.status = e.status; //>10就是商家订单
		this._status = e._status;
		this.completed = [12,102].indexOf(Number(this._status))!=-1;
		this.canceled = [9,29,39].indexOf(Number(this._status))!=-1;
		this.doLoginHandle(()=>{this.fetch();uni.hideLoading()});
	},
	methods:{
		//订单详情
		fetch(){
			console.log('childId：'+this.childId);
			this.showLoading();
			const action = !this.isSO?
			this.$api.orderDetail(this.childId):this.$api.saleOrderDetail(this.childId)
			
			action.then(res=>{
				this.hideLoading();
				// console.log(res);
				res.items.forEach(detail=>{	
					detail.goodsPrice= this.formatPrice(detail.goodsPrice)
				})
				res.expressFee=this.formatPrice(res.expressFee);
				res.goodsAmount=this.formatPrice(res.goodsAmount);
				res.orderAmount=this.formatPrice(res.orderAmount);
				//优惠券价格
				res.discountAmount=this.formatPrice(res.discountAmount);

				this.orderCreateTime = this.formatTime(res.createTime);
				this.payTime = res.payTime?this.formatTime(res.payTime):'';
				this.payType =res.payType;
				this.orderNum=res.orderNum;
				this.handleTime = this.formatTime(res.handleTime);
				this.Detail = res;
				
			}).catch(error=>{
				this.hideLoading();
				this.showError(error);
			})
		},
		
		
		formatTime(...arg){
			return formatTime(...arg);
		},
		
		// 联系客服
		chat(shopUserId){
			this.navigateTo('/module/message/chat/chat', { selToID: shopUserId ,channel: 'history'})
		},
		// 去到店铺
		gotoShop(shopId){
			uni.navigateTo({
				url: '../../module/shop/home/home?shopId='+shopId
			});
		},
		// 商品详情
		gotoGoodsDetail(goodsId){
			uni.navigateTo({
				url: '../../module/shop/goodsDetail/goodsDetail?goodsId='+goodsId
			});
		},
		// 申请退款
		applyrefund(item){
			const flowStatus =  this.Detail.flowStatus;
			
			const goodData = encodeURIComponent(JSON.stringify(item));
			uni.navigateTo({
				url: '../myself_applyForRefundDetails/myself_applyForRefundDetails?'+'&flowState='+flowStatus+'&data='+goodData
			});
		},
		updated(){
			uni.setStorageSync(this.updateFlag,true);
		}
		
	}
}