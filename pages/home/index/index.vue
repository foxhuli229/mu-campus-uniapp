<template>
	<view class="page">
		<!-- 搜索框 -->
		<view class="searchBar">
			<uni-search-bar></uni-search-bar>
		</view>
		<!-- 轮播 -->
		<!-- <web-view :url="webUrl"></web-view> -->
		<uni-swiper-dot :info="bannerUrl" :current="current" mode="default" field="content">
				<swiper class="swiper-box" 
						autoplay="true" 
						interval="5000"
						duration="1000" 
						circular="true" 
						@change="change">
					<swiper-item v-for="(item, index) in bannerUrl" :key="index">
						<view :class="swiper-item">
							<image class="image" 
								:src="item.cover" 
								:title="item.title" 
								:url="item.url" 
								mode="aspectFill"
								style="width: 100%;"
								@click="gonewWeb($event, item.url)"
								/>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		
		<!-- 导航 -->
		<view class="nav-list">
			<block v-for="(item, index) in navArray" :key="index">
				<navigator class="nav-item" :url="item.pageUrl" hover-class="none">
					<image :src="item.imgUrl" ></image>
					<text>{{ item.text }}</text>
				</navigator>
			</block>
		</view>

		<!-- 资讯 -->
		<view class="information">
			<view class="info-left">
				<text class="hot">热门</text>
				<text class="platform-introduction">平台介绍</text>
			</view>
			<navigator class="info-right" url="/pages/home/information/information" hover-class="none"><image :src="oosHost + 'sys/icon_information.png'"></image></navigator>
		</view>

		<!-- 活动列表 -->
		<view class="graphic-list">
			<block v-for="item of graphics" :key="item.id">
				<graphiclist
					:activeUrl="item.url"
					:title="item.title"
					:content="item.description"
					:imgUrl="item.cover"
				></graphiclist>
			</block>
		</view>
	</view>
</template>

<script>

var app = getApp();
const common = require("../../../publicjs/common.js");
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'; //轮播
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
export default {
	name: "HomeIndex",
	components:{
		uniSwiperDot,
		uniNavBar,
		uniSearchBar
	},
	data() {
		return {
			oosHost: '',
			max: 0,
			webUrl: 'https://mp.weixin.qq.com/s/xh-fiDHvn30XD7bUX5ttVg',
			webviewStyles: {
			},
			//轮播图
			bannerUrl: [],
			current: 0,
			//导航
			navArray: [
				{
					pageUrl: '/pages/universityActivities/activityIndex/activityIndex',
					imgUrl: 'http://mumu-small.oss-cn-shenzhen.aliyuncs.com/img/index/icon_active.png',
					text: '大学活动'
				},
				{
					pageUrl: '/pages/teamRecruitment/index/index',
					imgUrl: 'http://mumu-small.oss-cn-shenzhen.aliyuncs.com/img/index/icon_team.png',
					text: '组队招募'
				},
				{
					pageUrl: '',
					imgUrl: 'http://mumu-small.oss-cn-shenzhen.aliyuncs.com/img/index/icon_reward.png',
					text: '敬请期待'
				}
			],
			//热门图文
			graphics: []
		};
	},
	onShow() {
		this.oosHost = app.globalData.oosHost;
		uni.startPullDownRefresh();
		common.fonts(); //获取网络字体
		// common.checkLogin(); //验证是否登录
		this.indexSwiper(); //获取首页置顶图文
		this.getHotGraphic(); /**获取首页精选图文 */
		uni.hideHomeButton(); //隐藏首页按钮
	},
	//停止刷新
	onPullDownRefresh() {
		setTimeout(function () {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	methods: {
		//获取首页置顶图文
		indexSwiper() {
			common.requestURL({
				url: '/graphic/indexTop',
				method: 'GET'
			}).then(res => {
				if(res.code == 200) {
					this.bannerUrl = res.data;
				}
			})
		},
		//轮播切换
		change(e) {
			this.current = e.detail.current;
		},
		gonewWeb(e, url){
			console.log("进来了")
			url = "https://mp.weixin.qq.com/s/Zs-F9fMFvqvBBGlAMS79Uw";
			this.webUrl = url;
			console.log(e, url);
			if(url != "") {
				uni.navigateBack({
					url: url
				})
			}
		},
		
		/**
		 * 获取热门图文-轮播
		 */
		getHotGraphic: function() {
			common.requestURL({
					url: '/graphic/hot',
					method: 'GET'
				})
				.then(res => {
					this.graphics = res.data;
				});
		},
		
	}
};
</script>

<style scoped>
	.page {
		background-color: #FFFFFF;
	}
.nav-list {
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 24rpx;
	color: #414141;
	font-family: PangMenZhengDao;
	padding: 30rpx 0 40rpx;
}
.nav-list .nav-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.nav-list .nav-item image {
	width: 90rpx;
	height: 81rpx;
}
.information {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10rpx 20rpx;
	font-family: PangMenZhengDao;
	background-color: #f8f8f8;
	border-bottom: 2rpx solid #4c6ff3;
	color: #414141;
}
.information .info-left .hot {
	font-size: 1.3rem;
	margin-right: 7rpx;
}
.information .info-left .platform-introduction {
	font-size: 0.9rem;
}
.information .info-right {
	display: flex;
	align-items: center;
}
.information .info-right image {
	width: 36rpx;
	height: 36rpx;
}
.graphic-list {
	padding: 34rpx 20rpx;
}
/* 轮播图 */
swiper {
	min-height: 300rpx;
	max-height: 300rpx;
	overflow: hidden;
}
.swiper-item image {
	width: 100% !important;
	height: 300rpx;
	cursor: pointer;
}
</style>
