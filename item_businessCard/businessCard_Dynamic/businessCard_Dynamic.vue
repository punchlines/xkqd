<template>
	<view class="container fx-column">
		<view class="title">请选择动态类型</view>
		<view class="tishi">可多选，最少选一个，最多可选三个</view>
		<view class="dyStyle fx-row fx-row-space-between fx-row-center"
			  v-for="(item, index) of cateList"
			  :class="{'active': item._select, disabled: !item._select && !enableSelect }"
			  @click="selectCate(item)">
			<text>{{ item.name }}</text>
			<image src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/select.png" v-if="item._select"></image>
		</view>
		<!-- 确定按钮 -->
		<view class="BtnCon fx-row fx-row-middle">
			<view class="Btn" @click="confirm">确定</view>
		</view>
	</view>	
</template>
<script>
	// listJournalType
	// import {mapState,mapMutations} from 'vuex';

	const MAX_SELECT_COUNT = 3;

    export default {

      data() {
        return {
		  cateList: [],
        }
      },

      computed: {
        journal () {
          return this.$store.state.journalPublish;
		},
		selectCateList () {
          return this.journal.cate;
		},
        selectCount () {
		  return this.cateList.filter(item => item._select).length;
		},
		enableSelect () {
		  return this.selectCount < MAX_SELECT_COUNT;
		}
      },

	  onLoad () {
        uni.showLoading();
        this.$api.listJournalType().then(result => {
          uni.hideLoading();
          const list = result.journalTypeList;
          list.forEach(item => {
            item._select = this.selectCateList.find(cate => cate.id === item.id);
		  })
		  this.cateList = list;
		}).catch(error => {
          uni.hideLoading();
		  this.showError(error)
		})
	  },

      methods: {
        selectCate (item) {
          // 如果未选择且已选超过 3 条，禁止选择
          if (!item._select && this.selectCount >= MAX_SELECT_COUNT) {
            return;
		  }
          item._select = !item._select;
		},

        confirm () {
          if (this.selectCount === 0) {
            this.showTips('请选择分类！')
            return;
		  }

		  this.journal.cate = this.cateList.filter(item => item._select);
          uni.navigateBack();
		}

      },

    }
</script>
<style lang="less">

@import "../../css/jss_base.less";
.container{
	width:100%;font-family: PingFangSC;
	.title{margin-top:30upx; font-size:@fsContentTitle;color:@title;padding-left: 30upx;
	}
	.tishi{font-size: 24upx;color: #666666;padding-left:30upx;margin-top:15upx;}
	.dyStyle{
		width: 92%;margin: 0 auto; height:104upx;line-height: 104upx; border-bottom: 1px solid #EEEEEE;font-size:@fsSubTitle;color: @title;
		&>image{width: 28upx;height: 22upx;}
	}
	.active{color:#6B7AF8;}
	.disabled { color: #999999; }
	.BtnCon{
		position: fixed;bottom: 0;z-index: 99;width: 100%;height:98upx;text-align: center;background: #FFFFFF;
		.Btn{
			width:620upx ;height: 80upx;line-height: 80upx;font-size:28upx ;color: #FFFFFF;background: #6B7AF8;border-radius: 40upx;
		}
	}
}
		
</style>