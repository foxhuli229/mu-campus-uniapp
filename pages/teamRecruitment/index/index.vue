<template>
	<view class="page">
		<!-- 搜索框 -->
		<view class="searchBar">
			<uni-search-bar></uni-search-bar>
		</view>
		
		<view class="classify_list">
			<block v-for="(item, index) of tabs" :key="item.id">
				<view :id="index" 
					@tap="tabClick" 
					:class="['classify', activeIndex == index ? 'active_classify' : '']"
				>{{ item }}</view>
			</block>
		</view>
		<view class="team-list">
			<block v-for="(item, index) of teamList" :key="item.id">
				<teamitem :name="item.name" :title="item.title" :content="item.content"></teamitem>
			</block>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	const common = require('../../../publicjs/common.js');
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	
	export default {
		data() {
			return {
				oosHost: app.globalData.oosHost,
				activeIndex: 0,
				tabs: ['全部', '学习', '运动', '聚会', '比赛'],	
				// loadInfoParams: {
				//   college: "",
				//   type: "",
				//   pageNum: 1
				// },
				teamList: [
					{
						name:'Annine_',
						title:'参加重庆市计算机设计大赛',
						content:'12月17日，位于日内瓦的世界贸 。易组织（总部并不平静当天，WTO对美国  展开贸易政策审议。在会议上，中国对美国今年以来实施的钢铝关税等单边主义和保护主义政策以及美国阻挠上诉。'
					},
					{
						name:'Annine_2',
						title:'报考驾校组队优惠1000元',
						content:'12月17日，位于日内瓦的世界贸 。易组织（总部并不平静当天，WTO对美国  展开贸易政策审议。在会议上，中国对美国今年以来实施的钢铝关税等单边主义和保护主义政策以及美国阻挠上诉。'
					},
				]
			};
		},
		onLoad() {
			this.oosHost = app.globalData.oosHost;
			uni.startPullDownRefresh();
			// common.checkLogin(); //验证用户是否登录
		},
		//停止刷新
		onPullDownRefresh() {
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			//活动类型切换
			tabClick: function(e) {
				// console.log("进来咯");
				this.activeIndex = e.currentTarget.id;
				// if (e.currentTarget.id != 0) {
				//   this.loadInfoParams.type = this.tabs[e.currentTarget.id];
				// } else {
				//   this.loadInfoParams.type = "";
				// }
				// this.loadActivityInfo(this.loadInfoParams);
			}
		}
	};
	
</script>

<style scoped>
	.classify_list{
		width: 100%;
		box-sizing: border-box;
		height: 80rpx;
	}
	.team-list{
		padding: 26rpx 23rpx;
	}
</style>
