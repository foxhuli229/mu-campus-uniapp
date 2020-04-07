<template>
<uni-shadow-root class="activeList-activeList"><view class="weui-panel__bd">
	<navigator :url="activeUrl" @click="goactive" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
		<view class="weui-media-box__hd weui-media-box__hd_in-appmsg">
			<image class="weui-media-box__thumb" :src="imgUrl"></image>
		</view>
		<view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
			<view class="weui-media-box__title">{{title}}</view>
			<view class="weui-media-box__desc">{{content}}</view>
			<view class="weui-media-box__date">
				<icon class="iconfont icon-shizhong" style="vertical-align: unset;"></icon><text>{{date}}</text>
			</view>
		</view>
		<view class="active-lable" v-if="labelText">
			{{labelText}}
		</view>
	</navigator>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'activeList/activeList'
// pages/common/template/activeList/activeList.js
Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持

	},
	/**
	 * 组件的属性列表
	 * @param {type} activeUrl: 图片返回url地址
	 * @param {type} activeUrl: 图片返回url地址
	 * @param {type} title: 图片返回url地址
	 * @param {type} activeUrl: 图片返回url地址
	 * @param {type} activeUrl: 图片返回url地址
	 * @param {type} activeUrl: 图片返回url地址
	 * @param {type} activeUrl: 图片返回url地址
	 * @param {type} activeUrl: 图片返回url地址
	 */
	properties: {
		activeUrl: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		},
		imgUrl: {
			type: String,
			default: ''
		},
		date: {
			type: String,
			default: ''
		},
		labelText: {
			type: String,
			default: ''
		},
	},
	onLoad() {
		if(this.imgUrl.includes(",")) {
			let url = this.imgUrl.split(",");
			this.setData({
				imgUrl: url[0]
			})
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		goactive(url) {
			console.log(url)
			wx.navigateTo({
				url: url
			})
		}
	},
	
})
export default global['__wxComponents']['activeList/activeList']
</script>
<style platform="mp-weixin">
/* pages/common/template/activeList/activeList.css */
@import '/wxcomponents/weui.css';
@import '/wxcomponents/iconfont.css';
.weui-panel__bd{
  margin-bottom: 25rpx;
}
.weui-media-box {
  padding: 12rpx;
}

.weui-media-box_appmsg {
  background: #f8f8f8;
  border-radius: 20rpx;
}

.weui-media-box__hd {
  flex: 4;
}

.weui-media-box__bd {
  flex: 8;
  margin-right: 40rpx;
  text-align:left;
}

.weui-media-box__hd_in-appmsg {
  margin-right: 20rpx;
  width: 100%;
  height: 180rpx;
  line-height: unset;
}

.weui-media-box__title {
  font-weight: 400;
  font-size: 0.9rem;
  color: #585858;
  line-height: 2.5;
}

.weui-media-box__desc {
  color: #797979;
  font-size: 0.6rem;
  line-height: 1.5;
}
.weui-media-box__date{
  font-size: 0.6rem;
  color: #414141;
  /* display: flex;
  align-items: center; */
}
.weui-media-box__date icon{
  font-size: 0.6rem;
  color: #1297DC;
  margin-right: 10rpx
}
.weui-media-box__thumb {
	border-radius: 20rpx;
}
.active-lable {
	position: absolute;
	right: 0;
	bottom: 22rpx;
	padding: 10rpx 5rpx;
	
	background:rgba(76,111,243,1);
	border-radius:20rpx 0rpx 0rpx 20rpx;
	overflow: hidden;
	text-align: center;
	font-size:20rpx;
	font-family:Microsoft YaHei;
	font-weight:400;
	
	writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/  
	writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
	
	color:rgba(255,255,255,1);
}
</style>