<template>
	<view class="page">
		
	  <!-- 轮播 -->
	  <uni-swiper-dot 
	  	:info="bannerUrl" 
	  	:current="current" 
	  	mode="default" 
	  	:dots-styles="dotsStyles" 
	  	field="content">
	  	<swiper class="swiper-box" @change="change">
	  		<swiper-item v-for="(item, index) in bannerUrl" :key="index">
	  			<view :class="item.colorClass" class="swiper-item">
	  				<image class="image" :src="item.url" mode="aspectFill" />
	  			</view>
	  		</swiper-item>
	  	</swiper>
	  </uni-swiper-dot>
	  
	  <view class="weui-tab">
	    <!-- 收藏和分享 -->
	    <view class="collection-share">
	      <icon class='iconfont icon-shoucang' bindtap='acollect'></icon>
	      <icon class='iconfont icon-fenxiang' bindtap=''></icon>
	    </view>
	
	    <view class="weui-navbar">
	      <block v-for="(item, index) of tabs" :key="item.id">
	        <view 
				:id="index" 
				:class="['weui-navbar__item ', activeIndex == index ? 'weui-bar__item_on' : '']"  bindtap="tabClick">
	          <view class="weui-navbar__title">{{item.title}}</view>
	        </view>
	      </block>
	      <view class="weui-navbar__slider" 
				:style="{left: `${sliderLeft}px`, transform: `translateX(${sliderOffset}px)`}"></view>
	    </view>
		
	    <view class="weui-tab__panel">
	      <view class="weui-tab__content" 
				v-show="activeIndex != 0">
	        <view class='active_name'>{{vo.theme}}</view>
	        <view>举办单位：{{vo.postUnit}}</view>
	        <view>报名时间：{{vo.applyStartTime}} - {{vo.applyDeadline}}</view>
	        <view>面向人群：{{vo.crowd}} </view>
	        <view class='remark'>
	          <text>备注:</text>{{vo.note}}</view>
	        <view class='file'>
	          <image src='http://mumu-small.oss-cn-shenzhen.aliyuncs.com/img/active/word.png'></image>
	          <text @click='viewDoc'>在线预览活动策划</text>
	          <text @click='downLoadDoc'>下载</text>
	        </view>
	      </view>
	      <view class="weui-tab__content" v-show="activeIndex != 1">暂无内容</view>
	    </view>
	  </view>
	</view>
</template>

<script>
	var app = getApp();
	const common = require("../../../publicjs/common.js");
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'; //轮播
	
	export default {
		components: {
			uniSwiperDot
		},
		data() {
			return {
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
				tabs: [{
					'title': "活动详情"
				  },
				  {
					'title': "组队"
				  }
				],
				activeIndex: 0,
				sliderOffset: 0,
				sliderLeft: 0,
				vo: {
					document: ""
				}
			}
		},
		onLoad:function(options){
			 commonn.requestURL({
			      url: "/activity/detail",
			      method: "GET",
			      params: {
			        id: options.id
			      }
			    }).then(res => {
					this.vo = res.data.vo;
			    });
				//获取字体
			   common.fonts();
		},
		methods: {
			//预览文档
			viewDoc: function() {
				 uni.downloadFile({
				      url: this.oosHost + this.vo.document,
				      success(res) {
						if (res.statusCode === 200) {
							const filePath = res.tempFilePath;
							wx.openDocument({
							  filePath,
							  success(res) {
								console.log('打开文档成功')
							  }
							})
						}
				      }
				    })
			},
			//下载文档
			downLoadDoc:function() {
				 uni.downloadFile({
				      // 示例 url，并非真实存在
				      url: this.oosHost + this.vo.document,
				      success(res) {
				        const filePath = res.tempFilePath
				        wx.saveFile({
				          tempFilePath: filePath,
				          success(res) {
				            uni.showModal({
				              title: '提示',
				              content: '下载成功',
				            })
				          },
				          fail: function(res) {
				            console.log(res);
				          }
				        })
				      }
				    })
			}
		},
		
	}
</script>

<style scoped>
.weui-navbar {
  border-bottom:2rpx solid #4C6FF3;
  color: #585858;
  font-size: .9rem;
}
.weui-navbar__item {
  flex: unset;
  padding: 12rpx 16rpx
}
.weui-navbar__item .weui-navbar__title{
  padding: 10rpx 16rpx
}

.weui-navbar__item.weui-bar__item_on .weui-navbar__title{
  color:#FFFFFF;
  background-color: #4C6FF3;
  font-size: .7rem;
  border-radius:15rpx;
}
.weui-navbar__slider {
  display: none
}

/* 收藏和分享 */
.collection-share{
  position: absolute;
  display: flex;
  align-items: center;
  top: 10rpx;
  right: 0;
}

.collection-share icon{
  font-size: 42rpx;
  margin-right: 25rpx;
  color: #515151
  /* margin-top: 20rpx */

}

/* 活动详情 */
.weui-tab__content{
  color: #585858;
  font-size: .8rem;
  padding: 30rpx 40rpx
}
.active_name{
  font-family: PangMenZhengDao;
  font-size: 1.2rem;
}

.remark{
  font-size: .6rem;
  margin-top: 50rpx
}
.remark text{
  color: #4C6FF3
}
.file{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200rpx
}
.file image{
  width: 70rpx;
  height: 70rpx
}
.file text{
  text-decoration: underline;
  color: #4C6FF3
}
.file text:nth-child(2){
  margin: 0 40rpx
}
</style>
