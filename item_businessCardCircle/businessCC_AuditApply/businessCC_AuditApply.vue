<template>
	<view class="container">
		<!-- <topTabBarComponents id="topTabBar" bindtap="showToast" title="审核" backShow="true"></topTabBarComponents> -->
		<!-- 待处理，已处理切换标题 -->
		<view class="auditTitle">
			<view v-for="(item,index) in auditTitleBox.auditTitle" :key="index" @tap="changeTitle($event,index)"
				  :class="{'ATname':true,'ATactive':audiTitleActive==index}">{{item.title}}</view>
		</view>
		<view class="auditBox" v-if="audiTitleActive==0">
			<view class="auditTitleBox">
				<apply-list ref="applyList" :status="1" :circle-id="circleId"></apply-list>
			</view>

		</view>
		<!-- // 已处理的审批页面 -->
		<view class="dealWith top" v-if="audiTitleActive==1">
			<apply-list :status="2" :circle-id="circleId"></apply-list>
		</view>
	</view>
</template>

<script>
  import ApplyList from "./ApplyList";
  export default {
    components: {ApplyList},
    data() {
      return {
        onlineSite:this.global.onlineSite,
        //标题
        auditTitleBox:{
          auditTitle:[
            {id:0,title:'待处理'},{id:1,title:'已处理'}
          ],
        },
        audiTitleActive:0,   //切换标题
        //复选框
        auditCheckBox:[
          {id:0, isSelected: false},
          {id:1, isSelected: false},
          {id:2, isSelected: false},
          {id:3, isSelected: false}
        ],

        len:'',
        list:[],

        circleId: '',
      }
    },

	onLoad (option) {
      this.circleId = option.id;
	},

    methods:{

      //切换标题
      changeTitle(e,index){
        this.audiTitleActive=index;
      },
      // 选中按钮
      itemSelected(e,index) {
        var item = this.auditCheckBox[index];
        item.isSelected = !item.isSelected;
      },
      //单选选满时全选选中
      checkedAllCheckedbox(e,index,isSelected){
        var item=this.auditCheckBox[index];
        // item.isSelected=!item.isSelected;
        if(!item.isSelected){
          item.isSelected=true;
          if(this.list.indexOf(item.id)<0){
            this.list.push(item.id);
          }
        }else{
          item.isSelected=false;
          this.list.pop(item.id);
        }
        if(this.list.length===this.auditCheckBox.length){
          this.allSelected=true;
        }else{
          this.allSelected=false;
        }
      },
      //全选所有按钮
      selectAll(){
        this.allSelected = !this.allSelected;
        this.$refs.applyList.changeSelectAll(this.allSelected);
      }
    },

  }
</script>

<style scoped lang="less">
	@import '../../css/mzl_base.less';
	.container{
		background:@grayBg;padding-bottom:200upx;box-sizing:border-box; padding-top: 90upx; position: relative;
		min-height: 100vh;

	}
	// 待处理，已处理切换标题
	.auditTitle{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		.flex();background:#fff;color:#666;font-size:@fsSubTitle;border:5upx solid @grayBg;
		view{padding:20upx 0;}
		.ATactive{color:@tabActive;border-bottom:5upx solid @tabActive;box-sizing:border-box;}
	}
	// 复选框列表



	//   已处理的审批页面
	.dealWith{
		width:100%;
		.auditList{
			width:90%;padding:30upx;box-sizing:border-box;background:#fff;margin:0 auto;margin-top:30upx;
			.auditCard{
				.ACcardHeader{
					.flex();width:100%;
					.ACimage{
						width:20%;
						image{width:100upx;height: 100upx;}
					}
					.ACtitle{
						width:80%;padding:20upx;box-sizing:border-box;
						.ACTitlebOX{
							width:100%;height:70upx;
							.ACTname{margin-right:30upx;font-size:@fsContentTitle;color:@title;font-weight: bold;}
							.ACTsubname{width:auto;padding:0 10upx;display: inline-block;height:36upx;font-size:20upx;color:#666;background:#F8F8F8;text-align:center;line-height:36upx;border-radius: 18upx; }
							.ACTagress{position: relative;right:-110upx;font-size:24upx;color:#666;}
						}
						.ACcomany{
							width:100%;font-size:@fsNum;color:@logoNote;
						}
					}
				}
				.ACadd{
					height:80upx;line-height:80upx;background:#F8F8F8;box-sizing:border-box;font-size:@fsNum;color:#666;padding-left:20upx;
				}
				.ACcardBottem{
					height:80upx;border:1px solid @grayBg;font-size:28upx;color:#666;
					.flex();
					.ACrefuse{border-right:1upx solid @grayBg;}
					.ACreagree{font-size:28upx;color:@tabActive;}
				}
			}
			
		}
	}



</style>
