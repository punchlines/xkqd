<template>
	<view class="container">
		<view class="complainType fx-row fx-row-space-between fx-row-center" @click="getType">
			<text class="tishi">投诉类型</text>
			<input type="text" :value="currentType.enumName" disabled="disabled"/>
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" mode="widthFix"></image>
		</view>
		<!-- 投诉信息 -->
		<view class="complainInfo" :class="{'overFlowTextarea':hideText}">
			<textarea v-model="content" @click="focusArea" :focus="focus" @blur="blurArea" placeholder="请输入投诉详细信息" placeholder-class="taplace" class="content"/>
		</view>
		<view class="add">
			<image v-for="image in imageList" :src="image"></image>
			<image @click="uploadImage" v-if="imageList.length < 9" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"></image>
		</view>
		<!-- 投诉按钮 -->
		<view class="btnCon">
			<view class="btn" @click="submit">投诉</view>
		</view>
		<!-- 投诉类型弹框 -->
		<view class="complainModel" v-show="isComplain" @click="isComplain = false,hideText=false">
			<view class="complainCon" @click.stop="">
				<view class="title">投诉类型</view>
				<view class="item fx-row fx-row-space-between fx-row-center"
					  v-for="(item, index) of typeList" :key="item.id"
					  :class="{ active: currentType.id === item.id }"
					  @click.stop="selectType(item)">
					<view>{{item.enumName}}</view>
				</view>
				<!-- 按钮 -->
				<view class="sendbtn">
					<view class="btn" @click.stop="send">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
  export default {
    data() {
      return {
        onlineSite:this.global.onlineSite,
        isComplain:false,
				hideText:false,

		isCircleComplain: false,
        circleId: '',
        userId: '',
		focus:true,
        typeList: [],
		currentType: {},
		imageList: [],
		content: '',
      };
    },

	onLoad (option) {
      this.circleId = option.circleId;
      this.userId = option.userId;
      this.isCircleComplain = !!option.circle;

      uni.showLoading();
      this.$api.listComplainType().then(result => {
        uni.hideLoading();
        result.complainType.forEach(item => {
          item._select = false;
		})
        this.typeList = result.complainType;
	  }).catch(error => {
        uni.hideLoading();
	    this.showError(error);
	  })
	},

    methods:{

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
		
      selectType (type) {
        this.currentType = type;
	  },
      getType(){//弹出框
        this.isComplain = !this.isComplain;
				this.hideText=true;
      },
      typeClick(index){//选择投诉类型
        let isSelect = this.typeList[index].isSelect;
        this.typeList[index].isSelect = isSelect===true ? false:true;
      },
      send(){//选择完成
        this.isComplain = !this.isComplain;
				this.hideText=false;
      },
      uploadImage () {
        uni.chooseImage({
          count: 9,
          success: (res) => {
            uni.showLoading({ title: '上传中...' });
            let count = res.tempFilePaths.length;
            for (const path of res.tempFilePaths) {
            	this.uniUploadFile(path, url => {
								this.imageList.push(url)
							}, null, () => {
								if (--count <= 0) {
									uni.hideLoading();
								}
							})
            }
          }
        })
	  },

      submit () {
        if ('id' in this.currentType === false) {
          this.showTips('请选择投诉类型');
          return;
        }
        if (!this.content) {
          this.showTips('请输入投诉详细信息');
          return;
		}
        uni.showLoading();

        let action = this.isCircleComplain
			? this.$api.setCircleComplainApply(this.circleId, this.currentType.id, this.content, JSON.stringify(this.imageList))
			: this.$api.setMemberComplainApply(this.circleId, this.userId, this.currentType.id, this.content, JSON.stringify(this.imageList))

        action.then(result => {
          uni.hideLoading();
          this.showTips('投诉成功');
          uni.navigateBack();
		}).catch(error => {
		  this.showError(error);
		  uni.hideLoading();
		})
	  },

    },
  }
</script>

<style lang="less">

.container{
	width:100%;height: 100%; background:#F5F5F5 ;box-sizing:border-box;padding:30upx 0;
	box-sizing: border-box;
	min-height: 100vh;
	.complainType{
		width:92%;margin:0 auto; height:106upx;line-height:106upx;font-size:28upx;color:#333333;margin-bottom:30upx;
		background:#ffffff;border-radius:10upx;box-sizing:border-box;padding:0 30upx;
		image{width:14upx;height: 24upx;}
		.tishi{flex:8;}
		&>input{flex:22; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	}
	.complainInfo{
		width:92%;height:400upx;margin:0 auto;background: #FFFFFF;margin-bottom: 30upx;border-radius: 10upx;padding: 30upx;
		box-sizing: border-box;
		.taplace{font-size: 28upx;color: #CCCCCC;}
		.content{font-size: 28upx;color: #333333;line-height: 40upx;}
	}
	.overFlowTextarea{
		opacity: 0;
	}
	.add{
		margin-left: 30upx;
		display: flex;
		flex-wrap: wrap;

		image{
			width:220upx;height: 220upx;
			margin-right: 18upx;
			margin-bottom: 18upx;
		}

	}
	.btnCon{
		width:100%;height:98upx;position: fixed;left: 0;bottom: 0;background: #fff;
		.btn{
			width:620upx;margin: 9upx auto; height: 80upx;line-height: 80upx;text-align: center;
			background: #6B7AF8;border-radius: 40upx;color: #fff;font-size: 32upx;
		}
	}
	// 弹框
	.complainModel{
		width:100%;height: 100%;position: fixed;top: 0;left: 0;background: rgba(0,0,0,0.5);z-index: 999;
		.complainCon{
			width:100%;border-radius:20upx 20upx 0 0;background: #fff;color: #333333;position:absolute;
			bottom:100upx;
			.title{font-size: 32upx;text-align: center;font-weight: 500;padding-top:33upx;}
			.item{
				position: relative;
				width:100%;font-size: 28upx;font-weight: 400;box-sizing:border-box;padding:0 30upx;
				height: 106upx;line-height:106upx;border-bottom: 1px solid #E1E1E1;

				&.active {
					&:after {
						content: "";
						width: 28upx;
						height: 22upx;
						position: absolute;
						top: 50%;
						right: 30upx;
						transform: translateY(-50%);
						background-image: url("http://card-1254165941.cosgz.myqcloud.com/cardImages/images/select.png");
						background-size: 100% 100%;
					}
				}

				image{width:28upx;height: 22upx;}
			}
		}
		.sendbtn{
			width:100%;height:100upx;position: fixed;left: 0;bottom: 0;background: #fff;
			.btn{
				width:620upx;margin: 9upx auto; height: 80upx;line-height: 80upx;text-align: center;
				background: #6B7AF8;border-radius: 40upx;color: #fff;font-size: 32upx;
			}
		}
	}
}
</style>
