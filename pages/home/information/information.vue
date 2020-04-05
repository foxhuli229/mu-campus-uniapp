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
								<activecomponent :activeUrl="item.activeUrl" :title="item.title" :content="item.content" :imgUrl="item.imgUrl"></activecomponent>
							</block>
						</view>
					</view>
					<view class="weui-tab__content" v-show="activeIndex == 1">
						zixxx
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
			activeIndex: 0,
			sliderLeft: 0,
			sliderOffset: 0,
			activeArray: [
			  {
				"activeUrl": "222",
				"title": "222",
				"content": "222",
				"actiimgUrimgUrllveUrl": "222",
			  
			   },
			   {
				"activeUrl": "222",
				"title": "222",
				"content": "222",
				"actiimgUrimgUrllveUrl": "222",
			    }
			]
		};
	},
	onLoad:function(){
		//获取字体信息
		common.fonts();
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
		NoData() {
			return this.activeArray.length;
		}
	},
	watch: {},
	methods: {
		tabClick: function(e) {
			console.log('可以点击了');
			this.sliderOffset = e.currentTarget.offsetLeft;
			this.activeIndex = e.currentTarget.id;
		}
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
