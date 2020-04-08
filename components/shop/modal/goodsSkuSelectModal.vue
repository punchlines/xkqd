<template>
  <view class="shop_dialog">

    <view class="dialog-background" @click="$emit('close')"></view>

    <view class="dialog-content-container" style="max-height: 100vh;">

      <view class="dialog-content">
        <view class="goods-info-container">
          <image class="goods-cover" :src="goodsSku.mpGoods.coverImage"></image>
          <view class="goods-info">
            <view class="goods-title single-line">
							{{goodsSku.mpGoods.title}}
            </view>
            <view class="goods-meta">
              <view class="goods-price">
                <price :size="32" :value="priceObj ? priceObj.preferentialPrice * count : 0" ></price>
              </view>
              <view class="goods-count">库存{{ priceObj ? priceObj.goodsRepertory : 0 }}件</view>
            </view>
          </view>
        </view>

        <view class="line"></view>

        <!-- sku select -->
        <view class="sku-list">
				<label v-for="(parent, pIndex) in goodsSku.list" :key="parent.id">
					<view style="margin-bottom: 20upx;">{{ parent.name }}</view>
						<view class="sku bj">
							<label v-for="(sku, sIndex) in parent.sku" :key="sku.id">
								<view  @click="select(sku, parent,sIndex,pIndex)"
                                       class="sku-props-item sku-title bj-view"
                                       :class="{ active: sku.select}">{{ sku.name }}</view>
							</label>
						</view>
				</label>
        </view>

        <view class="line"></view>

        <view class="buy-count-container" v-if="!isGift">
          <view class="buy-count-text">购买数量</view>
          <view class="number-input">
						<number-input @inputTap='addTap' :disabled="skuCount === 0" :max="skuCount"></number-input>
					</view>
        </view>
      </view>

      <button class="btn-primary" :disabled="skuCount === 0" @click="confirm">确定</button>
    </view>

  </view>
</template>

<script>

  import price from '../_component/price';
  import NumberInput from "../_component/numberInput";
  import {mapState,mapMutations} from 'vuex';

  export default {
    name: "goodsSkuSelectDialog",

    components: {
      NumberInput,
      price,
    },

    props: {
      goodsSku: Object,
      isGift: Boolean,
    },

    data () {
      return {
        count: 1,
      }
    },
		onLoad(){
			
	
		},

    computed: {
      skuCount () {
        if (!this.priceObj) return 0;
        return this.priceObj.goodsRepertory;
      },

      priceObj () {
        const id = [];
        this.goodsSku.list.forEach(item => {
          const find = item.sku.find(sku => sku.select);
          if (find) {
            console.log(find.id)
            id.push(find.id)
          }
        })
        console.log(id.map(item => Number(item)).join(', '))

        const key = `[${id.map(item => Number(item)).join(', ')}]`;
				
        return this.goodsSku.dataMap[key];
      },
    },

    methods: {

      select (sku, parent,si,pi) {
				//
				this.$emit("select",{
					sIndex:si,
					pIndex:pi
				});
        parent.sku.forEach(item => item.select = false);
        sku.select = true;
      },

      addTap(value){
        // 库存为0时，不可以增加商品的数量
        console.log('value:');
        console.log(value);
        if(this.priceObj && this.priceObj.goodsRepertory==0){
          this.showTips('该规格的商品已售完，请选择其他规格').then(res=>{});
          return;
        }
        this.count=value;
      },

      confirm () {
        if(this.priceObj && this.priceObj.goodsRepertory==0){
          this.showTips('该规格的商品已售完，请选择其他规格').then(res=>{});
          return;
        }
        this.$emit('confirm',{
          skuNum: this.priceObj.skuNum,
          number: this.count,
          skuName: '',
          data: this.priceObj,
					skuId:this.priceObj.id
        })
        this.$emit('close');
      },

    },

  }
</script>

<style scoped lang="less">


  .goods-info-container {
    display: flex;
    height: 162upx;
    margin-bottom: 30upx;
    flex: 0 0 auto;

    .goods-cover {
      width: 162upx;
      height: 162upx;
      background-color: #eee;
      margin-right: 20upx;
      flex:0 0 auto;
    }
    .goods-info {
      position: relative;
      flex: 1;
      overflow-x: hidden;
    }
    .goods-title {
      font-size: 28upx;
      color: #333333;
    }
    .goods-meta {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
    }
    .goods-price {
      flex: 1;
    }
    .goods-count {
      font-size: 24upx;
      color: #666666;
    }
  }

  .sku-list {
    margin-top: 40upx;
    margin-bottom: 40upx;

    .sku + .sku {
      margin-top: 40upx;
    }
    .sku-title {
      font-size: 28upx;
      color: #333333;

    }
    .sku-props-list {
      display: flex;
      flex-wrap: wrap;
    }
    .sku-props-item {
      font-size: 24upx;
      padding: 12upx 30upx;
			margin-bottom: 15upx;

      margin-right: 28upx;
      background: #F5F5F5;
      color: #333333;
      border-radius: 8upx;

      &.active {
        color: #FFFFFF;
        background: #7483FF;
      }
    }
  }

  .buy-count-container {
    margin-top: 60upx;
    display: flex;
    align-items: center;
    .buy-count-text {
      font-size: 28upx;
      color: #333333;
      flex: 1;
    }
    .number-input {
    }
  }

  .btn-primary {
    flex: 0 0 auto;
    width: 100%;
  }
.bj{
	display: flex;flex-direction: row;align-items: center;justify-content: flex-start;flex-wrap: wrap;

}
.bj-view{
	margin-left: 20upx;
}

</style>
