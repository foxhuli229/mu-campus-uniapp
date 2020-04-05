<template>
	<view class="page">
		<!-- 自定义导航 -->
		<!-- <view class="example-body">
			<uni-nav-bar leftText="募校园"  @clickLeft="back"/>
		</view> -->

		<!-- 搜索框 -->
		<view class="searchBar"><search></search></view>
		<!-- 轮播 -->
		<uni-swiper-dot :info="bannerUrl" :current="current" mode="default" :dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" autoplay="true" interval="5000" duration="1000" circular="true" @change="change">
				<swiper-item v-for="(item, index) in bannerUrl" :key="index">
					<view :class="[item.colorClass, 'swiper-item']"><image class="image" :src="item.url" mode="aspectFill" /></view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<!-- 导航 -->
		<view class="nav-list">
			<block v-for="(item, index) in navArray" :key="index">
				<navigator class="nav-item" :url="item.pageUrl" hover-class="none">
					<image :src="item.imgUrl"></image>
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
					:activeUrl="'/pages/home/web/web?url=' + item.url"
					:title="item.title"
					:content="item.description"
					:imgUrl="item.cover"
					:date="item.date"
				></graphiclist>
			</block>
			<view class="uni-loadmore" v-if="showLoadMore">{{ loadMoreText }}</view>
		</view>
	</view>
</template>

<script>

var app = getApp();
const common = require("../../../publicjs/common.js");
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'; //轮播
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
export default {
	name: "HomeIndex",
	components:{
		uniSwiperDot,
		uniNavBar
	},
	data() {
		return {
			loadMoreText: "加载中...",
			max: 0,
			//轮播图
			bannerUrl: [
					{
						colorClass: 'uni-bg-red',
						url: app.globalData.oosHost + 'sys/index_banner.jpg',
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
			current: 0,
			dotsStyles: {},
			//导航
			navArray: [
				{
					pageUrl: '/pages/universityActivities/activityIndex/activityIndex',
					imgUrl: 'http://mumu-small.oss-cn-shenzhen.aliyuncs.com/img/index/icon_active.png',
					text: '大学活动'
				},
				{
					pageUrl: '',
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
			graphics: [
				{
					id: 1,
					url: '1111',
					title: '新一年的第一场比赛来啦',
					description: '2月17日，位于日内瓦的世界贸 。易组织总部并不平静。 当天，WTO...',
					cover:  app.globalData.oosHost + 'sys/index_banner.jpg',
					"date": new Date().toLocaleString()
				}
			]
		};
	},
	onLoad() {
		common.fonts(); //获取网络字体
		common.checkLogin(); //验证用户是否登录
		common.checkToken(); //检查token是否有效
		this.swiperData(); //获取首页轮播
		this.getHotGraphic(); /**获取首页精选图文 */
	},
	onUnload: function() {
		this.max = 0;
		this.graphics = [];
		this.loadMoreText = "加载更多";
		this.showLoadMore = false;
	},
	onReachBottom: function() {
		console.log("onReachBottom");
		if (this.max > 40) {
			this.loadMoreText = "没有更多数据了!"
			return;
		}
		this.showLoadMore = true;
		setTimeout(() => {
			this.setListData();
		}, 300);
	},
	onPullDownRefresh:function(){
		console.log('onPullDownRefresh');
		this.initData();
	},
	computed: {
		showLoadMore() {
			console.log("graphics 数据长度为: " + this.graphics.length);
			return this.graphics.length;
		}
	},
	methods: {
		initData(){
			setTimeout(() => {
				this.max = 0;
				this.data = [];
				let data = [];
				this.max += 10;
				for (var i = this.max - 9; i < this.max + 1; i++) {
					data.push(i)
				}
				this.data = this.data.concat(data);
				uni.stopPullDownRefresh();
			}, 300);
		},
		setListData() {
			let data = [];
			this.max += 10;
			for (var i = this.max - 9; i < this.max + 1; i++) {
				data.push(i)
			}
			this.data = this.data.concat(data);
		},

		/**
		 * 轮播接口
		 */
		swiperData: function() {

		},

		/**
		 * 获取热门图文
		 */
		getHotGraphic: function() {
			common.requestURL({
					url: '/graphic/hot',
					method: 'GET'
				})
				.then(res => {
					this.graphics = res.data;
					this.graphics = [
							{
								id: 1,
								url: '1111',
								title: '标题',
								description: 'description',
								cover: 'cover'
							}
						];
					console.log(this.graphics)
				});
		},
		//轮播切换
		change(e) {
			this.current = e.detail.current
		},
	}
};
</script>

<style scoped>
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
	width: 100%;
	height: 300rpx;
}
</style>
