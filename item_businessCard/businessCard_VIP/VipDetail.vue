<template>
	<view class="vip-detail">
		<!--  <view class="mask" v-if="isLock"></view> -->
		<view class="vip-container">
			<view class="pane">
				<view class="lineBox" v-for="(item,index) in vipList" v-if="item.id==vipIndex" :key="index">
					<view class="vip">
						{{item.text}}
					</view>
					<view class="text">
						{{item.info}}
					</view>
				</view>
				<view class="lineBoxs">
					<scroll-view class="scroll" scroll-x="true" @scroll="scroll" scroll-left="0">
						<view class="lineItem" v-for="(item,index) in vipPower" :key="index" :id="item.id" v-if="item.vip==vipIndex">
							<image :src="item.img"></image>
							<!-- <view>{{item.text}}</view> -->
						</view>
						<view class="lineItem" v-for="(item,index) in whitePower" :key="index" :id="item.id" v-if="item.vip==vipIndex">
							<image :src="item.img"></image>
							<!-- <view>{{item.text}}</view> -->
						</view>
						<view class="lineItem" v-for="(item,index) in goldPower" :key="index" :id="item.id" v-if="item.vip==vipIndex">
							<image :src="item.img"></image>
							<!-- <view>{{item.text}}</view> -->
						</view>
					</scroll-view>
				</view>
				<view class="lineBox" v-if="vipIndex==1" style="width: 97%; margin-top: -10rpx;">
					<!-- 铂金 -->
					<image style="height: 150rpx;width: 100%;" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.FpzsnswAabTV517c6adaba175aae6f251ac31055c506.gif" mode=""></image>
				</view>
				<view class="lineBox" v-if="vipIndex==0" style="width: 97%;margin-top: -10rpx;">
					<!-- 黄金 -->
					<image style="height: 150rpx;width: 100%;" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.hwls3nKHgQck3cb8d82b5610a5a135bb7d529fdb415a.gif" mode=""></image>
				</view>
				<view class="lineBox" v-if="vipIndex==2" style="width: 97%;margin-top: -10rpx;">
					<!-- 钻石 -->
					<image style="height: 150rpx;width: 100%;" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.i4smLEFk5HMa3d5ae7437a6698e63ec1c28536580065.gif" mode=""></image>
				</view>
				<!-- <view class="lineBox fix">
			<view class="typeItem">
					<Image src="http://card-1254165941.cosgz.myqcloud.com/VIPBanner/1.jpg"></Image>
					<view>服饰鞋包</view>
			</view>
			<view class="typeItem">
					<Image src="http://card-1254165941.cosgz.myqcloud.com/VIPBanner/2.jpg"></Image>
					<view>家居家电</view>
			</view>
			<view class="typeItem">
					<Image src="http://card-1254165941.cosgz.myqcloud.com/VIPBanner/3.jpg"></Image>
					<view>食品营养</view>
			</view>
			<view class="typeItem">
					<Image src="http://card-1254165941.cosgz.myqcloud.com/VIPBanner/4.jpg"></Image>
					<view>美妆护肤</view>
			</view>
			<view class="typeItem">
					<Image src="http://card-1254165941.cosgz.myqcloud.com/VIPBanner/5.jpg"></Image>
					<view>母婴童装</view>
			</view>
		</view> -->


				<!-- 特价秒杀 -->
				<!-- 自营商品 -->
				<template v-if="recommendLevel>=1&&vipIndex==0">


					<!-- <image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/191228/vip1.jpg" mode="widthFix" style="width: 750rpx;margin-bottom: 20rpx;"></image> -->

					<view class="ziGoods">
						<view class="goods-list">
							<!-- v-if="index <= 19 || (index>19 && showMore)" -->
							<view class="goods" v-for="(goods,index) in goodsList1" :key="index" @click="selectGoods(goods)" :class="{ active: currentSelectGoods && currentSelectGoods.id === goods.id }">
								<view class="goods-cover-container">
									<image class="goods-cover" :src="goods.image" mode="aspectFill"></image>

								</view>
								<!--<image class="select-icon" src="/static/vip/gou@2x.png"></image>-->
								<view class="goods-name ">{{ goods.goodsName }}</view>

								<view class="price_area">
									<view class="price">
										<price :size="31" v-model="goods.prePrice" color="#FF3B30"></price>
										<!-- <text class="original-price">¥{{ goods.oriPrice}}</text> -->

										<text class="order">已售{{goods.salesNum}}件</text>
									</view>
								</view>


								<view class="btnbox">
									<view class="btn" v-if="isNormalUser || !currentUser.id">
										<view @click.stop="openGoodsDetail(goods)">查看商品详情</view>
									</view>

									<!-- <view class="btn" v-else>
										<view @click.stop="openShareVipModel">立即分享</view>
									</view> -->
								</view>

							</view>
						</view>
					</view>
				</template>
				<template v-if="recommendLevel>=2&&vipIndex==1">
					<!-- <image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/191228/vip2.jpg" mode="widthFix" style="width: 750rpx;margin-bottom: 20rpx;"></image> -->

					<view class="ziGoods">

						<view class="goods-list">
							<!-- v-if="index <= 19 || (index>19 && showMore)" -->
							<view class="goods" v-for="(goods,index) in goodsList2" :key="index" @click="selectGoods(goods)" :class="{ active: currentSelectGoods && currentSelectGoods.id === goods.id }">
								<view class="goods-cover-container">
									<image class="goods-cover" :src="goods.image" mode="aspectFill"></image>

								</view>
								<!--<image class="select-icon" src="/static/vip/gou@2x.png"></image>-->
								<view class="goods-name ">{{ goods.goodsName }}</view>

								<view class="price_area">
									<view class="price">
										<price :size="31" v-model="goods.prePrice" color="#FF3B30"></price>
										<!-- <text class="original-price">¥{{ goods.oriPrice}}</text> -->

										<text class="order">已售{{goods.salesNum}}件</text>
									</view>
								</view>


								<view class="btnbox">
									<view class="btn" v-if="isNormalUser || !currentUser.id">
										<view @click.stop="openGoodsDetail(goods)">查看商品详情</view>
									</view>

									<!-- <view class="btn" v-else>
										<view @click.stop="openShareVipModel">立即分享</view>
									</view> -->
								</view>

							</view>
						</view>
					</view>

				</template>
				<template v-if="recommendLevel>=3&&vipIndex==2">
					<!-- <image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/191228/vip3.jpg" mode="widthFix" style="width: 750rpx;margin-bottom: 20rpx;"></image> -->

					<view class="ziGoods">

						<view class="goods-list">
							<!-- v-if="index <= 19 || (index>19 && showMore)" -->
							<view class="goods" v-for="(goods,index) in goodsList3" :key="index" @click="selectGoods(goods)" :class="{ active: currentSelectGoods && currentSelectGoods.id === goods.id }">
								<view class="goods-cover-container">
									<image class="goods-cover" :src="goods.image" mode="aspectFill"></image>

								</view>
								<!--<image class="select-icon" src="/static/vip/gou@2x.png"></image>-->
								<view class="goods-name">{{ goods.goodsName }}</view>

								<view class="price_area">
									<view class="price">
										<price :size="35" v-model="goods.prePrice" color="#FF3B30"></price>
										<!-- <text class="original-price">¥{{ goods.oriPrice}}</text> -->

										<text class="order" style="font-size: 22rpx;">已售{{goods.salesNum}}件</text>
									</view>
								</view>


								<view class="btnbox">
									<view class="btn" v-if="isNormalUser || !currentUser.id">
										<view @click.stop="openGoodsDetail(goods)">查看商品详情</view>
									</view>

									<!-- <view class="btn" v-else>
										<view @click.stop="openShareVipModel">立即分享</view>
									</view> -->
								</view>

							</view>
						</view>
					</view>
				</template>
			</view>





			<view class="pane">

				<view class="showMoreBox" v-if="goodsList.length>20" @click="showMore=!showMore">
					<image v-if="!showMore" class="showIcon" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/new.png"
					 mode=""></image>
					<image v-else class="showIcon" src="https://xk.gzskxx.com/myqcloud/template/up.png" mode=""></image>
					<view>{{showMore?"点击收起更多":"点击查看更多"}}</view>
				</view>

				<view class="title">特别声明</view>
				<view class="desc-text">
					在法律允许的范围内，销刻渠道拥有本次活动的最终解释权，发现任何违规行为，销刻渠道将有权取消此行为用户的店主资格及所获得的奖励。
				</view>
				<view class="desc-text">
					*本免责声明以及其修改权、更新权及最终解释权均属销刻渠道。
				</view>
				<rich-text nodes="<img style='width: 100%' src='http://card-1254165941.cosgz.myqcloud.com/VipPic/vipInfo.jpg' />"></rich-text>
				<!--<image class="step-image" src="http://card-1254165941.cosgz.myqcloud.com/vip/vipIntroStep.jpg"></image>-->
			</view>

		</view>
	</view>
</template>

<script>
	import price from '@/components/price';
	import mapState from 'vuex'
	const vip1 = [
		'http://card-1254165941.cosgz.myqcloud.com/VipPic/%E9%BB%84%E9%87%912_01.jpg',
		'http://card-1254165941.cosgz.myqcloud.com/VipPic/%E9%BB%84%E9%87%912_02.jpg',
		'http://card-1254165941.cosgz.myqcloud.com/VipPic/%E9%BB%84%E9%87%912_03.jpg',
	]

	const vip2 = [
		'http://card-1254165941.cosgz.myqcloud.com/VipPic/%E9%93%82%E9%87%912_01.jpg',
		'http://card-1254165941.cosgz.myqcloud.com/VipPic/%E9%93%82%E9%87%912_02.jpg',
		'http://card-1254165941.cosgz.myqcloud.com/VipPic/%E9%93%82%E9%87%912_03.jpg',
	]

	const vip3 = [
		'http://card-1254165941.cosgz.myqcloud.com/VipPic/%E9%92%BB%E7%9F%B32_01.jpg',
		'http://card-1254165941.cosgz.myqcloud.com/VipPic/%E9%92%BB%E7%9F%B32_02.jpg',
		'http://card-1254165941.cosgz.myqcloud.com/VipPic/%E9%92%BB%E7%9F%B32_03.jpg',
	]

	export default {

		name: "VipDetail",

		data() {
			return {
				vip1,
				vip2,
				vip3,
				introDetail: '',
				goodsList1: [],
				goodsList2: [],
				goodsList3: [],
				currentSelectGoods: null,
				showMore: false,
				current: '',
				interval: 2000,
				duration: 500,
				circular: true,
				vipList: [{
						id: 0,
						text: '黄金会员',
						info: '6项专属特权'
					},
					{
						id: 1,
						text: '铂金会员',
						info: '9项专属特权'
					},
					{
						id: 2,
						text: '钻石会员',
						info: '12项专属特权'
					}
				],
				swiperCurrent: 0,
				goldPower: [
					{
						id: 1,
						text: '商城功能',
						vip: 0,
						img:'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.peY2HuRnI8bdcc2ad877cea2aaa826750747331e4fee.png'
					}, {
						id: 2,
						text: '建收费社群',
						vip: 0,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.ySLa3EYd7ktb07a274a514d40b46307d824e4fb1b2d8.png'
					},
					{
						id: 3,
						text: '发起团购',
						vip: 0,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.eAD1fJR7mefKb90b746ce0016d06654d3038897d198c.png'
					},
					{
						id: 4,
						text: '智能名片',
						vip: 0,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.fmN8FFbteIoR6b5ffa7979afbacb0ca4906826df9611.png'
					},
					{
						id: 5,
						text: '分享赚钱',
						vip: 0,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.n2IreVrD3znM5b2b2f3123558d83dd6056e60d4aa69f.png'
					},
					{
						id: 6,
						text: '上架100样<br/>商品',
						vip: 0,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.yhXgeYcK44jS7b993342aff6920bfb6970ed0ae4dcd6.png'
					},
				],
				whitePower: [{
						id: 9,
						text: '建课程社群',
						vip: 1,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.XOVXcOYBglFYb3c125e938185677ad7b447ec5a78d3d.png'
					},
					{
						id: 7,
						text: '团队管理',
						vip: 1,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.nXKkc7nCDiKN57293eb803e389527137515b1fd30ae4.png'
					},
					{
						id: 8,
						text: '数据管理',
						vip: 1,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.4hAIqR0ENOitd6a95b545e97cc2837d4a1e58a30e5f4.png'
					},
					{
						id: 1,
						text: '商城功能',
						vip: 1,
						img:'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.peY2HuRnI8bdcc2ad877cea2aaa826750747331e4fee.png'
					}, {
						id: 2,
						text: '建收费社群',
						vip: 1,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.ySLa3EYd7ktb07a274a514d40b46307d824e4fb1b2d8.png'
					},
					{
						id: 3,
						text: '发起团购',
						vip: 1,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.eAD1fJR7mefKb90b746ce0016d06654d3038897d198c.png'
					},
					{
						id: 4,
						text: '智能名片',
						vip: 1,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.fmN8FFbteIoR6b5ffa7979afbacb0ca4906826df9611.png'
					},
					{
						id: 5,
						text: '分享赚钱',
						vip: 1,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.n2IreVrD3znM5b2b2f3123558d83dd6056e60d4aa69f.png'
					},
					{
						id: 6,
						text: '上架100样<br/>商品',
						vip: 1,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.yT3cqBP9SBHUc7677a807de0d867cb47331e9aefc1e2.png'
					},
				],
				vipPower: [{
						id: 12,
						text: '成为平台供应商',
						vip: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.F2ujH6pYVHql3adb6637d4535296f6e489daeb0e7423.png'
					},
					{
						id: 11,
						text: '店铺管理',
						vip: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.U28FQ3dAozk4f6c95e4fe0294f19d588589e19e38535.png'
					},
					{
						id: 10,
						text: '店铺引流',
						vip: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.BVvPiJKrFr0R1b47e06b4746150c59fd092da091c330.png'
					},
					{
						id: 9,
						text: '建课程社群',
						vip: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.1kt1UK2Wg1h99e8eea5ab674ebeb39699f56357ef36c.png'
					},
					{
						id: 7,
						text: '数据管理',
						vip: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.VOqlyCBUrQAL31201c97eb5590e56ebf68b621dd7754.png'
					},
					{
						id: 8,
						text: '团队管理',
						vip: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.I9XIWcOPDqnh0a1d0891d3668c14d8c90470537350a7.png'
					},
					{
						id: 1,
						text: '商城功能',
						vip: 2,
						img:'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.peY2HuRnI8bdcc2ad877cea2aaa826750747331e4fee.png'
					}, {
						id: 2,
						text: '建收费社群',
						vip: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.ySLa3EYd7ktb07a274a514d40b46307d824e4fb1b2d8.png'
					},
					{
						id: 3,
						text: '发起团购',
						vip: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.eAD1fJR7mefKb90b746ce0016d06654d3038897d198c.png'
					},
					{
						id: 4,
						text: '智能名片',
						vip: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.fmN8FFbteIoR6b5ffa7979afbacb0ca4906826df9611.png'
					},
					{
						id: 5,
						text: '分享赚钱',
						vip: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.n2IreVrD3znM5b2b2f3123558d83dd6056e60d4aa69f.png'
					},
					{
						id: 6,
						text: '上架100样<br/>商品',
						vip: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.bJWKcP33RFcpb2a56af3b45a5a8ff22b9ac13bdd5052.png'
					},

				],
				indexKEY1: -1,
				allList: [{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/goods.png',
						title: '全部'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/zuanshi.png',
						title: '珠宝'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/bingxiang.png',
						title: '家电'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/xiebaopeishileimufill.png',
						title: '女鞋'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/jiatingqingji.png',
						title: '日用'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/jiazhuangjiajuleimufill.png',
						title: '家居'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/nvbao.png',
						title: '箱包'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/1.png',
						title: '园艺'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/2.png',
						title: '商务'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/3.png',
						title: '生鲜'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/4.png',
						title: '家具'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/5.png',
						title: '酒水'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/6.png',
						title: '母婴'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/7.png',
						title: '美妆'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/8.png',
						title: '汽车'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/9.png',
						title: '医药'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/10.png',
						title: '礼品'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/11.png',
						title: '数码'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/12.png',
						title: '运动'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/13.png',
						title: '工业'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/14.png',
						title: '女装'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/15.png',
						title: '电器'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/16.png',
						title: '内衣'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/17.png',
						title: '宠物'
					},
					{
						img: 'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/18.png',
						title: '男鞋'
					},
				]
			}
		},

		components: {
			price
		},

		props: {
			vipLevel: [Number, String],
			recommendLevel: [Number, String],
			vipIndex: {
				type: Number,
				default: 0,
			}
		},

		computed: {

			isOpen() {
				const userType = Number(this.currentUser.userType);
				const vipLevel = [2, 3, 4].includes(userType) ?
					userType - 1 :
					0;
				return vipLevel >= this.vipLevel;
			}
		},

		watch: {
			currentSelectGoods() {
				this.$emit('change', {
					vipLevel: this.currentSelectGoods.vipLevel,
					goods: this.currentSelectGoods
				});
			},
		},

		mounted() {
			// const mapFunc = (img) => {
			//   return `<img style="width: 100%; display: block;" src="${img}" />`
			// }

			// if (this.vipLevel == 1) {
			//   this.introDetail = this.vip1.map(mapFunc).join('');
			// } else if (this.vipLevel == 2) {
			//   this.introDetail = this.vip2.map(mapFunc).join('');
			// } else if (this.vipLevel == 3) {
			//   this.introDetail = this.vip3.map(mapFunc).join('');
			// }
			
			
			
			this.$api.getVipGoods(1).then(result => {
				this.goodsList1 = result;
				if (this.isNormalUser || !this.currentUser.id) {
					this.currentSelectGoods = result[0] || null;
				}


				this.$api.getVipGoods(2).then(result => {
					this.goodsList2 = result;


					this.$api.getVipGoods(3).then(result => {
						this.goodsList3 = result;
						this.hideLoading();
					}).catch(error => {
						this.showError(error);
						this.hideLoading();
					})

				}).catch(error => {
					this.showError(error);
					this.hideLoading();
				})

			}).catch(error => {
				this.showError(error);
				this.hideLoading();
			})




		},

		methods: {
			addClass(categroy, index) {
				this.current = index;
				this.indexKEY1 = index;
				console.info(index)
			},
			selectGoods(goods) {
				if (this.isNormalUser || !this.currentUser.id) {
					this.currentSelectGoods = goods

				} else {
					this.openGoodsDetail(goods);
				}
			},
			openShareVipModel() {
				this.$emit('openVipShareModal');
			},

			goodsList(){
				if(this.vipIndex==0){
					uni.showLoading()
					this.$api.getVipGoods(1).then(result=>{
						this.goodsList1 = result;
						uni.hideLoading()
					})
				}else if(this.vipIndex==1){
					this.$api.getVipGoods(2).then(result=>{
						this.goodsList2 = result;
						uni.hideLoading()
					})
				}else{
					this.$api.getVipGoods(3).then(result=>{
						this.goodsList3 = result;
						uni.hideLoading()
					})
				}
			},

			openGoodsDetail(goods) {
				this.navigateTo('/module/shop/goodsDetail/goodsDetail', {
					goodsId: goods.id,
					isGift: true,
					vipLevel: goods.vipLevel,
					recommendId: this.recommendId,
				});
			},
			mai() {
				uni.navigateTo({
					url: '../../item_businessCard/businessCard_tool/businessCard_mai'
				});
			},
			gong() {
				uni.navigateTo({
					url: '../../item_businessCard/businessCard_tool/businessCard_gong'
				});
			},

			kai() {
				uni.navigateTo({
					url: '../../item_pinGroup/businessCC_xiang/businessCC_kai'
				});
			},
			safe() {
				uni.navigateTo({
					url: '../../item_pinGroup/businessCC_xiang/businessCC_safe'
				});
			},
		},

	}
	//https://xk.gzskxx.com/myqcloud/template/up.png
</script>

<style scoped lang="less">
	@keyframes bounes {
		0% {
			transform: translateY(0)
		}

		50% {
			transform: translateY(15upx)
		}

		100% {
			transform: translateY(0)
		}
	}



	.vip-container {
		background-color: #FFFFFF;
		border-radius: 20upx;
	}

	.vip-detail {
		position: relative;
		padding-bottom: 90upx;

		.mask {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, .5);
			z-index: 9999;
		}
	}

	.TBMswiperNum {
		width: 80upx;
		height: 42upx;
		background: rgba(0, 0, 0, .4);
		position: absolute;
		top: 20upx;
		right: 30upx;
		border-radius: 21upx;
		text-align: center;
		line-height: 42upx;
		color: #FFFFFF;
		font-size: 24upx;
	}


	.pane {
		.showMoreBox {

			height: 200upx;
			text-align: center;
			font-size: 28upx;

			.showIcon {
				margin-top: -15upx;
				width: 87rpx;
				height: 87rpx;
				// animation: bounes linear 2s infinite;
				// height: 120upx;
			}
		}

		.title {
			text-align: center;
			font-size: 40upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			line-height: 50upx;
			letter-spacing: 1upx;
			margin-bottom: 8upx;
			padding-top: 30upx;

			&:before,
			&:after {
				content: "";
				display: inline-block;
				width: 32upx;
				height: 22upx;
				background-size: 100% 100%;
				background-image: url('data:image/png;base64,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');
			}

			&:before {
				margin-right: 20upx;
			}

			&:after {
				margin-left: 16upx;
			}

		}

		.intro {
			text-align: center;
			font-size: 24upx;
			color: #999;
			line-height: 34upx;
			padding-bottom: 36upx;
		}


		.VIPtitle {
			border-top: 7upx #eee solid;
			border-bottom: 10upx #eee solid;
			background-color: white;
			height: 178upx;
			margin-bottom: 120upx;

			.ping {
				position: relative;
				padding-top: 78upx;

				image {
					width: 100%;
					height: 178upx;
				}
			}

			.tai {
				position: absolute;
				top: 815upx;
				left: -61upx;

				image {
					width: 285upx;
					height: 256upx;
				}
			}
		}
	}

	// 滑动
	.all {
		width: 100%;
		display: flex;
		white-space: nowrap;

		.all-goods {
			width: 95%;
			display: flex;
			justify-content: space-between;

			.gun {
				height: 100%;
				display: inline-block;
				margin-right: 30upx;
				margin-left: 45upx;
				font-size: 36upx;
				font-family: Adobe Heiti Std R;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
			}

			.all-img {
				width: 82upx;
				height: 79upx;
			}

			.isCheck {
				border-bottom: 4upx solid rgba(48, 147, 246, 1);
				text-align: center;
			}
		}
	}

	// 特价商品
	.ziGoods {
		padding-top: 20rpx;
		background-color: #F5F5F5;
		.ziVip {
			image {
				width: 100%;
				height: 222upx;
			}
		}
	}


	.goods-list {
		padding: 0 30upx;
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 20upx;

		.goods {
			display: inline-block;
			width: calc(50% - 15upx);
			margin-right: 20upx;
			margin-bottom: 20upx;
			background: rgba(255, 255, 255, 1);
			padding-bottom: 15rpx;
			border-radius: 10px;

			.btnbox {
				font-size: 28upx;
				color: white;

				.btn {
					width: 243upx;
					height: 62upx;
					background-color: #108EE9;
					line-height: 62upx;
					text-align: center;
					margin: 0 auto;
					border-radius: 31upx;
					margin-top: 49upx;
					margin-bottom: 30upx;
				}

			}

			&:nth-child(2n) {
				margin-right: 0;
			}

			.goods-cover-container {
				width: 100%;
				padding-bottom: 100%;
				
				position: relative;
				margin-bottom: 24upx;
			}

			.price_area {
				font-size: 36upx;
				letter-spacing: 3upx;
				text-indent: 10upx;
				line-height: 50upx;
				width: 100%;
				height: 50upx;

				.price {
					letter-spacing: 1rpx;
					

					.original-price {
						text-decoration: line-through;
						font-size: 21upx;
						color: #ccc;
						line-height: 59upx;
						margin-left: 8upx;
					}
				}

				.order {
					font-size: 24rpx;
					font-family: Adobe Heiti Std R;
					font-weight: normal;
					color: #999999;
					line-height: 47rpx;
					float: right;
					margin-right: 8upx;
					margin-top: 5rpx;
					letter-spacing: -1rpx;
				}
			}

			.goods-cover {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
			}

			&.active {
				.goods-cover-container:after {
					content: "";
					position: absolute;
					width: 40upx;
					height: 40upx;
					right: 10upx;
					bottom: 65upx;
					background-size: 100% 100%;
					background-image: url('data:image/png;base64,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');
				}
			}

			.goods-name {
				font-size: 30upx;
				color: #333333;
				line-height: 40upx;
				margin-bottom: 20upx;
				overflow: hidden;
				// white-space: nowrap;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				text-overflow: ellipsis;
				width: 300rpx;
				height: 40px;
				margin-left: 18upx;
				 display: -webkit-box;/*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
				 -webkit-line-clamp: 2;/*用来限制在一个块元素显示的文本的行数。*/
				 -webkit-box-orient: vertical;/*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
			}

			.price-container {
				display: flex;
				align-items: flex-end;
				height: 40upx;

				.goods-price {
					display: inline-block;
					height: 40upx;
				}

			}
		}
	}

	.pane {

		.lineBox {
			width: 90%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			// margin-top: -20rpx;

			&.fix {
				width: 100%;
				margin-top: 20upx;
			}

			&.fixNoMargin {
				width: 100%;
				margin-top: 0upx;
			}



			.typeItem {
				text-align: center;
				color: #929292;
				font-size: 27upx;
				width: 19.9%;
				border: 0.5upx solid #eee;
				padding: 20upx 0;
				border-left: none;

				//margin-left: 10upx;
				// &:not(:nth-of-type(1)){
				//  border-left:none
				// }
				&:nth-last-of-type(1) {
					border-right: none;
				}

				Image {
					width: 69upx;
					height: 69upx;
				}

			}

			.hotItem {
				text-align: left;
				border: 0.5upx solid #eee;
				padding: 20upx 0;
				border-left: none;
				width: 50%;
				padding-left: 50upx;
				border-top: none;

				&:nth-last-of-type(1) {
					border-right: none;
				}

				.textBox {
					display: inline-block;
					padding-left: 15upx;
					width: calc(100% - 81upx - 65upx);
					white-space: nowrap;

					view {
						font-size: 30upx;

						&:nth-of-type(2) {
							font-size: 25upx;
							color: #ccc;
						}
					}

				}


				Image {
					width: 81upx;
					height: 81upx;
					vertical-align: top;
					margin-left: 15upx;
				}
			}
		}

		.title {
			margin-bottom: 30upx;
		}

		.desc-text {
			font-size: 24upx;
			line-height: 40upx;
			color: #999;
			padding: 0 60upx;
			margin-bottom: 30upx;
		}

		.step-image {
			margin-top: 30upx;
			width: 100%;
			height: 220upx;
		}
	}

	.vip {
		font-size: 34rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #333333;
		font-weight: bold;
	}

	.text {
		font-size: 26rpx;
		font-weight: 600;
		font-family: PingFangSC-Medium, PingFang SC;
		color: rgba(51, 51, 51, 1);
		line-height: 37px;
		
	}

	.lineBoxs {
		margin-left: 20rpx;
		margin-top: -20rpx;
		.scroll {
			width: 100%;
			height: 260rpx;
			white-space: nowrap;

			.lineItem {
				margin-top: 25upx;
				flex: 1;
				width: 150rpx;
				height: 210rpx;
				box-shadow: 0px 2px 10px 0px rgba(153, 153, 153, 0.2);
				border-radius: 10px;
				display: inline-block;
				margin-right: 15rpx;

				image {
					width: 100%;
					height: 100%;
				}

				view {
					font-size: 26rpx;
					color: #3B3B3B;
					font-weight: 500;
					letter-spacing: 4upx;
					font-weight: bold;
					margin-top: 17upx;
					text-align: center;
				}
			}

		}
	}

</style>
