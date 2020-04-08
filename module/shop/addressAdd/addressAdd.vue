<template>

  <view class="page">
		<!-- #ifdef MP-WEIXIN -->
		<!-- 微信地址导入 -->
			<view class="importFormWechat" @click="importFormWechat"> 从微信导入地址
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="go"></image>
			</view>
		<!-- #endif -->
	
    <view class="form">
      <view class="form-item">
        <view class="label">收件人</view>
        <view class="control">
          <input placeholder="请输入收件人" v-model="form.name">
        </view>
      </view>

      <view class="form-item">
        <view class="label">联系电话</view>
        <view class="control">
          <input placeholder="请输入收件人常用电话" v-model="form.phone" maxlength="11">
        </view>
      </view>

      <view class="form-item">
        <view class="label">所在地</view>
        <view class="control" >
					
				<view class="perRight fx-row fx-row-space-between fx-row-center">
					<input placeholder="请选择省市区" placeholder-class="hintMessage" :value="pickerText" disabled="disabled" @click="showMulLinkageThreePicker"></input>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="go"></image>
				</view>

        </view>
       <!-- <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt=""></image> -->
      </view>

      <view class="form-item">
        <view class="label">详细地址</view>
        <view class="control">
          <input placeholder="请输入详细地址" v-model="form.detailedAddress">
					
        </view>
      </view>

    </view>

    <view class="check" @click="form.isDefault = Number(!form.isDefault)">
      <a-checkbox v-model="form.isDefault" disabled></a-checkbox> <text>设为默认地址</text>
    </view>

    <button class="btn-primary" @click="post">保存</button>

   <!--城市三级联动 -->
		<mpvue-city-picker themeColor="#6B7AF8" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm">
		</mpvue-city-picker>
		<!--城市三级联动 -->
	 
  </view>

</template>

<script>

  import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';

	import aCheckbox from '../_component/aCheckbox.vue'

  export default {

		components: {
			aCheckbox,
			 mpvueCityPicker
		},

    data () {
      return {
				onlineSite:this.global.onlineSite,
        themeColor: '#6B7AF8',
        // defaultValue: [0, 0, 1],
        form: {
          name: '',  // 收件人
          phone: '',
          province: '',
          city: '',
          area: '',
          detailedAddress: '',
          zipCode: '0,0,1',
          isDefault: 0,
        },
				pickerText:'北京市-市辖区-西城区',
				cityPickerValueDefault: [0, 0, 0],
      }
    },
		
		
		
		

    onLoad (options) {
			console.log(options)
      if (options.id) {
        // for (const key in options) {
        //   const newKey = key.replace(/_(\w)/g, (value, b) => value.replace('_', '').toUpperCase());
        //   options[newKey] = options[key]
        //   if (newKey !== key) delete options.key
        // }
        options.isDefault = options.isDefault == 1?1:0;
				//this.value1 = [options.province,options.city,options.area];
				this.pickerText = [options.province,options.city,options.area].join('-');
        this.defaultValue = options.zip_code ? options.zip_code.split(',') : [0, 0, 0];
        this.form = JSON.parse(JSON.stringify(options));
				this.form.addressId = options.id;
      }
    },

    computed: {
//       cityShow () {
//         if (!this.form.province) return '';
//         return `${this.form.province} ${this.form.city} ${this.form.area}`
//       },
    },

    methods: {
			 onConfirm(e) {
				 console.log(e)
				 let [ province, city, area ] = e.label.split('-');
				 
					this.form.province = province;
					this.form.city = city;
					this.form.area = area;
					this.pickerText = e.label;
      },
			
			    // 三级联动选择选择省市区
      showMulLinkageThreePicker() {
        this.$refs.mpvueCityPicker.show()
      },
			importFormWechat(){
					// #ifdef MP-WEIXIN
						uni.chooseAddress({
								success:(res) =>{
										console.log("授权成功")
										if(res.errMsg.indexOf('ok')!=-1){
											console.log("获取收货地址成功")
											console.log(res)
											this.form.phone = res.telNumber;
											this.form.name = res.userName;
											const { provinceName ,cityName, countyName,detailInfo} = res;
											this.pickerText = [provinceName,cityName,countyName].join('-');
											this.form.province = provinceName;
											this.form.city = cityName;
											this.form.area = countyName;
											this.form.detailedAddress = detailInfo;
										}
										
								},
								fail:(err)=> {
										//console.log(err)
										if(err.errMsg.indexOf('fail')!=-1){
											console.log("获取收货地址失败")
											this.showSettingModal();
											
										}
								}
						})
						
					// #endif
			},
			
			showSettingModal(){
					uni.showModal({
						title: '获取失败',
						content: '获取收货地址失败,请授权获取地址',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: (res) => {
							if(res.confirm){
									uni.openSetting({
										scope:'scope.address',
										success:(res)=> {
											if(res.authSetting['scope.address']==true){
													this.importFormWechat();
												}else{
													
												}
												
											},
											fail:()=> {
												//this.showSettingModal();
											}
										})
								}
							
								
							}
					});
			},
			
			


      post () {
				let [ province, city, area ] = this.pickerText.split('-');
			 
				this.form.province = province;
				this.form.city = city;
				this.form.area = area;
		
        if (!this.form.name) return this.showError('请输入收件人');
        if (!this.form.phone) return this.showError('请输入手机号');
        if (!this.form.phone.match(/^((0\d{2,3}-\d{7,8})|(1[358764]\d{9}))$/)) return this.showError('请输入有效的电话号码');
        if (!this.form.province) return this.showError('请选择所在地');
        if (!this.form.detailedAddress) return this.showError('请输入详细地址');

        const postData = JSON.parse(JSON.stringify(this.form));
        // if (postData.id) postData.addressId = postData.id;
         postData.isDefault = postData.isDefault ? 1 : 0;

        this.showLoading();
        this.$api.addOrUpdateAddress(postData).then(result => {
          uni.showToast({ title: postData.id ? '修改成功' : '添加成功', duration: 1000 });
          uni.navigateBack()
          uni.hideLoading()
        }).catch(error => {
          uni.hideLoading()
          this.showError(error)
        })
      },

    },

  }


</script>

<style scoped lang="less">


  .page {
    background-color: #ffffff;
		.importFormWechat{
			height: 120upx;
			width: 100%;
			background: url('../../../static/vip/weixin.png') no-repeat #f3f3f3 15upx 40upx;
			background-size: 40upx;
			font-size: 25upx;
			text-indent: 60upx;
			line-height: 122upx;
			position: relative;
			.go{
				position: absolute;
				right: 10upx;
				top: 48upx;
				width: 14upx;
				height: 24upx;
			}
		}
  }

  .form {
    padding: 0 30upx;
    margin-bottom: 26upx;
  }

  .form-item {
    display: flex;
    align-items: center;
    border-bottom: 1upx solid #E1E1E1;
    height: 106upx;

    .label {
      width: 120upx;
      font-size: 28upx;
      color: #000000;
      margin-right: 40upx;
    }
    .control {
      flex: 1;
    }
    input {
      width: 100%;
      height: 104upx;
      line-height: 104upx;
      font-size: 28upx;
      color: #333333;
      &::placeholder {
        color: #CCCCCC;
      }
    }
    image {
      width:12upx;
      height: 24upx;
      vertical-align: middle;
    }
  }

  .check {
    margin-left: 30upx;
    font-size: 24upx;
    color: #333333;
    margin-bottom: 95upx;
		display: flex;
		align-items: center;
		text {
			margin-left: 16upx;
		}
  }

  .btn-primary {
    width: 670upx;
    margin: 0 auto;
  }



</style>
