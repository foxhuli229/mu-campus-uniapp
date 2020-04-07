<template>
<uni-shadow-root class="teamItem-teamItem"><view class="weui-panel__bd team-item">
  <view :class="ellipsis?'ellipsis':'unellipsis'">
    <view class="team-item-top">
	  <view class="avatar-name">
		  <image :src="avatarUrl"></image>
		  <view class="name-num">
			  <view class="name">{{name}}</view>
			  <view>
				  <icon class="iconfont icon-shizhong" style="vertical-align: baseline;font-size: 24rpx;color: #4F6DF4;"></icon>
				  <text>{{currentNum}}/{{totalNum}}</text>
			  </view>
		  </view>
	  </view>
	  <view>{{belong}}</view>
    </view>
    <view class="team-item-bottom">
		<view class="remaining-time">
			<view>
				<view>项目组队招募</view>
				<view>
					<text>组队剩余</text>
					<text class="time">{{remainTime}}小时</text>
					<text>结束</text>
				</view>
			</view>
			<view @click="ellipsis">{{ellipsis? '':'︿'}}</view>
		</view>
		<view class="content">{{content}}</view>
		<view class="departments">
			<block v-for="(item,index) in (range)" :key="item.index">
				<view class="department-item">{{item}}</view>
			</block>
		</view>
		<view class="operate">
			<button class="operate-btn tousu" type="default" size="mini">投诉</button>
			<button class="operate-btn jiaru" type="default" size="mini" @click="toJoin">申请加入</button>
			<icon class="iconfont icon-fenxiang" style="color: #4B6FF2;font-size: 40rpx;"></icon>
		</view>
	</view>
    
  </view>
  <view @click="ellipsis" :class="ellipsis?'drop-down':'undrop-down'">
	  <text>{{title}}</text>
	  <text>﹀</text>
	  
  </view>

</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'teamItem/teamItem'
// pages/common/template/teamItem/teamItem.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },
  /**
   * 组件的属性列表
   */
  properties: {
	activeUrl: { type: String, value: '' }, 
	avatarUrl: { type: String, value: 'https://mumu-small.oss-cn-shenzhen.aliyuncs.com/images/head1.png' }, 
	name: { type: String, value: 'Annine_' }, 
	title: { type: String, value: '参加重庆市计算机设计大赛' }, 
    totalNum: { type: Number, value: 10 }, 
    currentNum: { type: Number, value: 0 },
    remainTime: { type: Number, value: 24 },
    content: { type: String, value: '' },
    belong: { type: String, value: '重庆文理学院' },
    range: { type: Array, value: ['计算机学院','美术学院'] },
    cover: { type: String, value: '' }

  },

  /**
   * 组件的初始数据
   */
  data: {
    ellipsis: true,// 文字是否收起，默认收起
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ellipsis() {
      let that = this;
      // let value = !this.data.ellipsis;
      that.setData({
        ellipsis: !that.data.ellipsis
      })
    },
	toJoin(){
		wx.navigateTo({
			url:'/pages/teamRecruitment/join/join'
		})
	}
  }
})
export default global['__wxComponents']['teamItem/teamItem']
</script>
<style platform="mp-weixin">
/* pages/common/template/teamItem/teamItem.css */
@import '/wxcomponents/weui.css';
@import '/wxcomponents/iconfont.css';

.team-item{
	border-radius: 20rpx;
	font-size: 24rpx;
	color: #4A576A;
	margin-bottom: 20rpx;
}
.drop-down{
	background-color: #F8F8F8;
	border-radius: 0 0 20rpx 20rpx;
	padding: 24rpx 18rpx;
	border-top: 1rpx solid #A2B9FD;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.undrop-down{
	display: none;
}
/* 修改列数 3行 */
.ellipsis {
    /* display: -webkit-box;
    -webkit-box-orient:vertical;
    text-overflow: ellipsis;
    overflow:hidden;
    -webkit-line-clamp: 3; */
	height: 144rpx;
	overflow: hidden;
	background-color: #F8F8F8;
	border-radius: 20rpx 20rpx 0 0;
}
/* 展示全部 */
.unellipsis {
/*  display: -webkit-box;
  -webkit-box-orient:vertical;
  text-overflow: ellipsis;
  overflow:hidden;
  -webkit-line-clamp: 0;*/
  height: auto;
  overflow: unset;
  background-color:#FFFFFF
 }
 .team-item-top{
	 display: flex;
	 justify-content: space-between;
	 align-items: center;
	 padding: 22rpx 19rpx;
 }
  .team-item-top image{
	  width: 86rpx;
	  height: 86rpx;
	  border-radius: 50%;
	  margin-right: 26rpx;
  }
  .avatar-name{
	  display: flex;
	  align-items: center;
  }
  .avatar-name .name{
	  font-size: 28rpx;
	  font-weight: bold;
  }
  .remaining-time{
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  font-size: 26rpx;
	  color: #4C6FF3;
  }
  .remaining-time .time{
	  color: #FF3B3B;
	  margin: 0 10rpx;
  }
  .team-item-bottom{
  	 padding: 22rpx 19rpx;
  }
  .team-item-bottom .content{
	  margin: 34rpx 0;
  }
  .departments{
	  display: flex;
	  color: #4C6FF3;
	  font-size: 24rpx;
	  flex-wrap: wrap;
  }
  .department-item{
	  padding: 8rpx 15rpx;
	  border: 1rpx solid #4C6FF3;
	  border-radius: 6rpx;
	  margin-right: 40rpx;
	  margin-bottom: 34rpx;
  }
  .operate{
	  display: flex;
	  align-items: center;
	  justify-content: space-around;
  }
  button.operate-btn{
	  background-color: #4C6FF3;
	  color: #fff;
	  font-size: 26rpx;
	  /* padding: 0; */
  }
  button.tousu{
	  width: 25%;
  }
  button.jiaru{
	  width: 55%;
  }
</style>