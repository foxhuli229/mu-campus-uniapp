<template>
	<view class="page">
		<!-- 搜索 -->
		<search></search>

		<!-- 轮播 -->
		<uni-swiper-dot :info="imgUrls" :current="current" mode="default" :dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box"
			 autoplay="true"
			 interval="5000" 
			 duration="1000" 
			 circular="true"
			 @change="change">
				<swiper-item v-for="(item, index) in imgUrls" :key="index">
					<view :class="[item.colorClass, 'swiper-item']">
						<image class="image" :src="item.url" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<view class="classify_list">
			<block v-for="(item, index) of tabs" :key="item.id">
				<view :id="index" 
					@tap="tabClick" 
					:class="['classify', activeIndex == index ? 'active_classify' : '']"
				>{{ item }}</view>
			</block>
		</view>

		<!-- 活动 -->
		<view class="weui-tab__content" style="padding:23rpx">
			<view class="active-list">
				<block v-for="item of pageInfo.records" :key="item.id">
					<activecomponent 
						:activeUrl="'/pages/home/universityActivities/activityDetail?url=' + item.id" 
						:title="item.title" 
						:content="item.description" 
						:imgUrl= item.imgUrl
						:date="item.date"></activecomponent>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
var app = getApp();
const common = require('../../../publicjs/common.js');
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'; //轮播
var loadInfoParams = {
  college: "",
  type: "",
  pageNum: 1
};
export default {
	components: {
		uniSwiperDot
	},
	data() {
		return {
			oosHost: app.globalData.oosHost,
			//轮播图
			imgUrls: [
				{
					colorClass: 'uni-bg-red',
					url:  app.globalData.oosHost + 'sys/index_banner.jpg',
					content: '内容 A'
				},
				{
					colorClass: 'uni-bg-green',
					url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
					content: '内容 B'
				},
				{
					colorClass: 'uni-bg-blue',
					url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
					content: '内容 C'
				}
			],
			activeIndex: 0,
			tabs: ['全部', '创新创业', '应用开发', '商业开发', '艺术', '体育活动'],
			current: 0,
			dotsStyles: {},
			autoplay: true,
			interval: 5000,
			duration: 1000,
			pageInfo: {
				records: [
					{
						id: 101,
						title: '大学生素质提升活动',
						description: '大学生素质提升活动既大学生的素质提升活动周年大质提升活动周年..大学生素质提升活动既大学生的素质提升活动周年大质提升活动周年..',
						imgUrl: app.globalData.oosHost + 'sys/index_banner.jpg',
						date: new Date().toLocaleString()
					},
					{
						id: 101,
						title: '大学生素质提升活动',
						description: '大学生素质提升活动既大学生的素质提升活动周年大质提升活动周年..大学生素质提升活动既大学生的素质提升活动周年大质提升活动周年..',
						imgUrl: app.globalData.oosHost + 'sys/index_banner.jpg',
						date: new Date().toLocaleString()
					}
				]
			}, //活动列表
			loadInfoParams: {
			  college: "",
			  type: "",
			  pageNum: 1
			}
			
		};
	},
	onLoad: function(options) {
		common.fonts(); //获取网络字体
		common.checkToken(); //检查token是否有效
		this.loadActivityInfo(); //获取活动信息
	},
	methods: {
		//大学活动
		loadActivityInfo: function() {
			console.log("发送请求中");
		},
		//轮播切换
		change: function(e) {
			this.current = e.detail.current;
		},
		//活动类型切换
		tabClick: function(e) {
			console.log("进来咯");
			this.activeIndex = e.currentTarget.id;
			 if (e.currentTarget.id != 0) {
			  this.loadInfoParams.type = this.tabs[e.currentTarget.id];
			} else {
			  this.loadInfoParams.type = "";
			}
			this.loadActivityInfo(this.loadInfoParams);
		}
	}
};
</script>

<style scoped>
.activitySwiper image {
	width: 100%;
	height: 290rpx;
}
/* 轮播图 */
swiper {
	min-height: 300rpx;
	max-height: 300rpx;
	overflow: hidden;
}
.swiper-item image {
	width: 100%;
	height: 300rpx;
}
/* 活动列表 */
.active-list {
	padding: 34rpx 20rpx;
}
</style>
