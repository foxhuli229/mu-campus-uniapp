<template>
	<view class="weui-panel__bd">
		<navigator :url="activeUrl" 
					class="weui-media-box weui-media-box_appmsg" 
					hover-class="weui-cell_active">
			<view class="weui-media-box__hd weui-media-box__hd_in-appmsg">
				<image class="weui-media-box__thumb" :src="imgUrl" />
			</view>
			<view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
				<view class="weui-media-box__title">{{ title }}</view>
				<view class="weui-media-box__desc">{{ content }}</view>
				<view class="weui-media-box__date">
					<icon class="iconfont icon-shizhong"></icon>
					{{ date }}
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
export default {
	name: 'graphiclist',
	props: {
		activeUrl: {
			type: String,
			default: ''
		},
		imgUrl: {
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
		date: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			loadMoreText: "加载中...",
			showLoadMore: false,
			max: 0,
			
		};
	},
	onLoad: () => {
		this.initData();
	},
	onUnload() {
		// this.max = 0,
		// this.data = [],
		// this.loadMoreText = "加载更多",
		// this.showLoadMore = false;
	},
	methods:{
		//数据加载
		initData() {
			
		}
	}
};
</script>

<style scoped>
	@import '/wxcomponents/weui.wxss';
	@import '/wxcomponents/iconfont.wxss';
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
	  /* vertical-align: top */
	  margin-top: -20rpx;
	  margin-right: 10rpx
	}
	.weui-media-box__hd {
		width: 240rpx;
		height: 180rpx;
	}
	.weui-media-box__hd image {
		border-radius: 20rpx;
	}
	
</style>
