<template>
	<view class="page">
		<!-- 搜索 -->
		<uni-search-bar></uni-search-bar>

		<!-- 轮播 -->
		<uni-swiper-dot :info="imgUrls" :current="current" mode="default" :dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" autoplay="true" interval="5000" duration="1000" circular="true" @change="change">
				<swiper-item v-for="(item, index) in imgUrls" :key="index">
					<view :class="[item.colorClass, 'swiper-item']"><image class="image" :src="item.url" mode="aspectFill" /></view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<view class="classify_list">
			<block v-for="(item, index) of tabs" :key="index">
				<view :id="index" @tap="tabClick" :class="['classify', activeIndex == index ? 'active_classify' : '']">{{ item }}</view>
			</block>
		</view>

		<!-- 活动 -->
		<view class="weui-tab__content" style="padding:23rpx">
			<view class="active-list">
				<block v-for="item of records" :key="item.id">
					<activecomponent
						:activeUrl="'/pages/universityActivities/activityDetail/activityDetail?url=' + item.id"
						:title="item.theme"
						:content="item.description"
						:imgUrl="item.posters"
						:date="item.applyDeadline"
						:labelText="item.region"
					></activecomponent>
				</block>
				<view class="uni-loadmore" v-if="showLoadMore">{{ loadMoreText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
var app = getApp();
const common = require('../../../publicjs/common.js');
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'; //轮播
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
export default {
	components: {
		uniSwiperDot,
		uniSearchBar
	},
	data() {
		return {
			//下拉刷新
			loadMoreText: '加载中...',
			showLoadMore: false,
			max: 0, //监听是否有数据
			//轮播图
			imgUrls: [
				{
					colorClass: 'uni-bg-red',
					url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
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
			//活动列表数据
			records: [
				// {
				// 	id: 6,
				// 	theme: '微电影大赛',
				// 	description: ' 为进一-步推动社会 主义文化大发展大繁荣，展现当代大学生文化追求与创作才华，特举办此次比赛。',
				// 	posters:
				// 		'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586104414589&di=15e8b9148233e7d8e130ff63cd36a87a&imgtype=0&src=http%3A%2F%2Fwww.hrtv.cn%2Ftemplets%2Fdefault%2F2017new%2Fimage%2Fsmallvideo.jpg',
				// 	region: '校级',
				// 	applyDeadline: '2020-05-27'
				// }
			],
			
			loadInfoParams: {
				college: '',
				type: '',
				pageNum: 1
			}
		};
	},
	onShow: function(options) {
		uni.startPullDownRefresh();
		this.getuserinfo(); //获取缓存中的用户信息
		this.getlist(); //获取活动信息
	},
	methods: {
		//获取缓存中的用户信息
		getuserinfo() {
			try {
				const value = uni.getStorageSync('userinfolist');
				if (value) {
					this.loadInfoParams.college = value.college == null ? '' : value.college;
				}
			} catch (e) {
				// error
				console.log('缓存中信息获取失败');
			}
		},
		//大学活动
		getlist: function() {
			this.showLoadMore = false;
			this.loadMoreText = "加载中";
			let college = '&college=' + this.loadInfoParams.college;
			if (this.loadInfoParams.college == '' || typeof this.loadInfoParams.college == null) {
				college = '';
			}
			let type = '&type=' + this.loadInfoParams.type;
			if (this.loadInfoParams.type == '' || typeof this.loadInfoParams.type == null) {
				type = '';
			}
			let params = '?pageNum=' + this.loadInfoParams.pageNum + '&pageSize=' + 5 + college + type;
			common
				.requestURL({
					url: '/activity/index' + params,
					method: 'GET'
				})
				.then(res => {
					if(res.code == 200) {
						let data = res.data.records;
						if(data.length > 0){
							this.max = 1;
							this.loadInfoParams.pageNum = this.loadInfoParams.pageNum +1;
							let itemdata = [];
							for(let k in data) {
								let obj = data[k];
								if( data[k].posters.includes("||")) {
									let posters =  data[k].posters.split("||");
									obj.posters = posters[0];
								}
								itemdata.push(obj)
							}
							data = itemdata;
							this.records = this.records.concat(data);
						}else {
							this.max = 0;
							this.loadMoreText = "没有更多数据了";
							if(this.loadInfoParams.pageNum == 1) {
								this.loadMoreText = "暂无数据"
							}
							this.showLoadMore = true
						}
						uni.stopPullDownRefresh();
					}
					
				});
		},
		
		//轮播切换
		change: function(e) {
			this.current = e.detail.current;
		},
		//活动类型切换
		tabClick: function(e) {
			this.activeIndex = e.currentTarget.id;
			if (e.currentTarget.id != 0) {
				this.loadInfoParams.type = this.tabs[e.currentTarget.id];
			} else {
				this.loadInfoParams.type = '';
			}
			this.records = [];
			this.loadInfoParams.pageNum = 1;
			this.max = 1;
			this.loadMoreText = "加载中";
			this.showLoadMore = false;
			this.getlist();
		}
	},
	onUnload() {
		this.max = 0;
		this.records = [], 
		this.loadMoreText = '加载更多';
		this.showLoadMore = false;
	},
	//滚动到底部
	onReachBottom() {
		if(this.loadMoreText.includes("数据")) {
			//包含 暂无数据，没有更多数据的条件判断
			return;
		} 
		setTimeout(() => {
			this.getlist();
		}, 300);
	},
	//监听该页面用户下拉刷新事件
	onPullDownRefresh() {
		if(this.loadMoreText.includes("数据")) {
			//包含 暂无数据，没有更多数据的条件判断
			return;
		}
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
		this.getlist();
	},
};
</script>

<style scoped>
page {
	background-color: #ffffff;
}
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
.uni-loadmore {
	text-align: center;
	font-size: 24rpx;
}
</style>
