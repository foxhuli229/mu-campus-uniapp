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
				{
					"id":"00006",
					"theme":"微电影大赛",
					"description":" 为进一-步推动社会 主义文化大发展大繁荣，展现当代大学生文化追求与创作才华，特举办此次比赛。",
					"posters":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586104414589&di=15e8b9148233e7d8e130ff63cd36a87a&imgtype=0&src=http%3A%2F%2Fwww.hrtv.cn%2Ftemplets%2Fdefault%2F2017new%2Fimage%2Fsmallvideo.jpg",
					"region":"校级",
					"applyDeadline":"2020-05-27"
				},
				{
					"id":"00007",
					"theme":"演讲比赛",
					"description":"为了丰富文化节内容和广大同学的课余生活，加强课堂学习和交流，提高同学们的学习积极性，特此举办此次比赛。",
					"posters":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586105082037&di=b21e3b3674e6e9e9bb749ceb737de869&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F06%2F17%2F70dc66ff6da60b2e2f7bccbef0535f5f.jpg",
					"region":"校级",
					"applyDeadline":"2020-05-27"
				},
				{
					"id":"00005",
					"theme":"羽毛球大赛",
					"description":"为促进球友之间的交流,给大家营造一种良好的运动氛围,加强体育锻炼, 增强体质,为更好的工作生活打下良好的身体素质基础。",
					"posters":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586104000911&di=0006ec4342af6ec2c71b8c82d4c53939&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fbackgd%2Fcover%2F00%2F01%2F30%2F5b4fdfca65145.jpg%2521%2Ffw%2F780%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue",
					"region":"校级",
					"applyDeadline":"2020-05-05"
				},
				{
					"id":"00008",
					"theme":"书法大赛",
					"description":"为了丰富文化节内容和广大同学的课余生活，加强课堂学习和交流，提高同学们的学习积极性，特此举办此次比赛。",
					"posters":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586105379499&di=4f8108b8cc661e45028c5ab618645715&imgtype=0&src=http%3A%2F%2Fpic37.photophoto.cn%2F20151220%2F0017030075968347_b.jpg",
					"region":"校级",
					"applyDeadline":"2020-05-05"
				},
				{
					"id":"00003",
					"theme":"主持人大赛",
					"description":"为促进当代大学生身心素质全面发展，建设和谐‘、文明校园，并发掘具有主持特长的在校学生，为学校举办各种晚会输送后备力量。",
					"posters":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586103144593&di=9f374cf950d6a07a35c6401fff5d773c&imgtype=0&src=http%3A%2F%2Fy1.ifengimg.com%2Fa19e4d7867df1f5d%2F2015%2F0729%2Frdn_55b83c8551f8f.jpg",
					"region":"校级",
					"applyDeadline":"2020-04-30"
				}
			],
			
			loadInfoParams: {
				college: '',
				type: '',
				pageNum: 1
			}
		};
	},
	onShow: function() {
		uni.startPullDownRefresh();
		// this.getlist(); //获取活动信息
	},
	methods: {

		//大学活动
		getlist: function() {
			this.showLoadMore = false;
			this.loadMoreText = "加载中";
			let params = {
				"pageNum": this.loadInfoParams.pageNum,
				"pageSize": 5
			}
			if (this.loadInfoParams.college != '' && typeof this.loadInfoParams.college != null) {
				params.college = this.loadInfoParams.college;
			}
			if (this.loadInfoParams.type != '' && typeof this.loadInfoParams.type != null) {
				params.type = this.loadInfoParams.type;
			}
			common
				.requestURL({
					url: '/activity/index',
					params,
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
