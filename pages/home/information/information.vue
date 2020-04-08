<!--资讯（图文列表和平台介绍）-->
<template>
	<view class="page">
		<view class="page__bd">
			<view class="weui-tab">
				<view class="weui-navbar">
					<block v-for="(item, index) of tabs" :key="item.id">
						<view :id="index" :class="['weui-navbar__item', activeIndex == index ? 'weui-bar__item_on' : '']" @click="tabClick">
							<icon :class="['iconfont ', item.icon]"></icon>
							<view class="weui-navbar__title">{{ item.title }}</view>
						</view>
					</block>
					<view class="weui-navbar__slider" v-bind:style="{ left: `${sliderLeft}px`, transform: `translateX(${sliderOffset}px)` }"></view>
				</view>

				<!-- 内容 -->
				<view class="weui-tab__panel">
					<view class="weui-tab__content" v-show="activeIndex == 0">
						<view class="active-list">
							<block v-for="item of activeArray" :key="item.index">
								<graphiclist
									:activeUrl="item.url"
									:title="item.title"
									:content="item.description"
									:imgUrl="item.cover"
								></graphiclist>
							</block>
						</view>
					</view>
					<view class="weui-tab__content" v-show="activeIndex == 1">
						<view class="active-list">
							<block v-for="item of activeArray" :key="item.index">
								<graphiclist
									:activeUrl="item.url"
									:title="item.title"
									:content="item.description"
									:imgUrl="item.cover"
								></graphiclist>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
import common from '../../../publicjs/common.js'
export default {
	data() {
		return {
			tabs: [
				{
					icon: 'icon-zixun',
					title: '精选资讯'
				},
				{
					icon: 'icon-pingtaiguanli',
					title: '平台介绍'
				}
			],
			activeIndex: 0, //0：精选资讯， 1：平台介绍
			sliderLeft: 0,
			sliderOffset: 0,
			activeArray: [
				 {
					"id":"1246713382376099844",
					"cover":"http://cmrs-oos.oss-cn-beijing.aliyuncs.com/sys/index_banner.jpg",
					"title":"新一年的第一场比赛来啦",
					"description":"2月17日，位于日内瓦的世界贸 。易组织总部并不平静。 当天，WTO...",
					"url":"https://mp.weixin.qq.com/s/xh-fiDHvn30XD7bUX5ttVg",
					"type":null,
					"isDel":null,
					"gmt_create":null
				},
				{
					"id":"1246713382376099845",
					"cover":"http://cmrs-oos.oss-cn-beijing.aliyuncs.com/sys/index_banner.jpg",
					"title":"新一年的第一场比赛来啦",
					"description":"2月17日，位于日内瓦的世界贸 。易组织总部并不平静。 当天，WTO...",
					"url":"https://mp.weixin.qq.com/s/xh-fiDHvn30XD7bUX5ttVg",
					"type":null,
					"isDel":null,
					"gmt_create":null
				},
				{
					"id":"1246713382376099846",
					"cover":"http://cmrs-oos.oss-cn-beijing.aliyuncs.com/sys/index_banner.jpg",
					"title":"新一年的第一场比赛来啦",
					"description":"2月17日，位于日内瓦的世界贸 。易组织总部并不平静。 当天，WTO...",
					"url":"https://mp.weixin.qq.com/s/xh-fiDHvn30XD7bUX5ttVg",
					"type":null,
					"isDel":null,
					"gmt_create":null
				}
			]
		};
	},
	onLoad:function(){
	
	},
	onShow() {
		//获取字体信息
		common.fonts();
		// this.getlist(); //获取页面数据
		// uni.startPullDownRefresh();  //刷新
	},
	//停止刷新
	onPullDownRefresh() {
		setTimeout(function () {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onShow: function() {
		let this_ = this;
		uni.getSystemInfo({
			success: function(res) {
				this_.sliderLeft = (res.windowWidth / this_.tabs.length - sliderWidth) / 2;
				this_.sliderOffset = (res.windowWidth / this_.tabs.length) * this_.activeIndex;
			}
		});
	},
	computed: {
		
	},
	watch: {},
	methods: {
		tabClick: function(e) {
			let this_ = this;
			this.sliderOffset = e.currentTarget.offsetLeft;
			this.activeIndex = e.currentTarget.id;
			// this.getlist();
			
			this.activeArray = [];
			uni.showLoading({
				title: "加载中"
			})
			setTimeout(function() {
				this_.activeArray = [
				 {
					"id":"1246713382376099844",
					"cover":"http://cmrs-oos.oss-cn-beijing.aliyuncs.com/sys/index_banner.jpg",
					"title":"新一年的第一场比赛来啦",
					"description":"2月17日，位于日内瓦的世界贸 。易组织总部并不平静。 当天，WTO...",
					"url":"https://mp.weixin.qq.com/s/xh-fiDHvn30XD7bUX5ttVg",
					"type":null,
					"isDel":null,
					"gmt_create":null
				},
				{
					"id":"1246713382376099845",
					"cover":"http://cmrs-oos.oss-cn-beijing.aliyuncs.com/sys/index_banner.jpg",
					"title":"新一年的第一场比赛来啦",
					"description":"2月17日，位于日内瓦的世界贸 。易组织总部并不平静。 当天，WTO...",
					"url":"https://mp.weixin.qq.com/s/xh-fiDHvn30XD7bUX5ttVg",
					"type":null,
					"isDel":null,
					"gmt_create":null
				},
				{
					"id":"1246713382376099846",
					"cover":"http://cmrs-oos.oss-cn-beijing.aliyuncs.com/sys/index_banner.jpg",
					"title":"新一年的第一场比赛来啦",
					"description":"2月17日，位于日内瓦的世界贸 。易组织总部并不平静。 当天，WTO...",
					"url":"https://mp.weixin.qq.com/s/xh-fiDHvn30XD7bUX5ttVg",
					"type":null,
					"isDel":null,
					"gmt_create":null
				}
			]
			
			uni.hideLoading()
			}, 300)
		},
		//获取页面数据
		getlist() {
			let url = "/graphic/selection";
			if(this.activeIndex == 1) {
				url = "/graphic/intro";
			}
			common.requestURL({
				url: url,
				method: 'GET',
			}).then( res => {
				this.activeArray = res.data;
			})
		},
		
	}
};
</script>

<style>
.page__bd {
	padding-bottom: 0;
}
.weui-navbar {
	border-bottom: 18rpx solid rgba(248, 248, 248, 1);
}
.weui-tab__content {
	padding: 55rpx 23rpx;
	text-align: center;
}
.weui-navbar__item {
	color: #414141;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.2rem;
	font-family: PangMenZhengDao;
}
.weui-navbar__item:first-child {
	position: relative;
}
.weui-navbar__item:first-child::after {
	position: absolute;
	width: 4rpx;
	height: 50%;
	content: '';
	top: 25%;
	left: 100%;
	background-color: rgba(233, 233, 233, 1);
}

.weui-navbar__item icon {
	font-size: 34rpx;
	margin-top: -10rpx;
	margin-right: 18rpx;
}

.weui-navbar__item.weui-bar__item_on {
	color: #414141;
}
.weui-navbar__slider {
	background: #4c6ff3;
}
</style>
