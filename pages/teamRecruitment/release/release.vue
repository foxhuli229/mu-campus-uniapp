<template>
	<view class="page">
		<form @submit="" @reset="">
			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label title">标题</view>
				</view>
				<view class="weui-cell__bd">
					<input class="weui-input" name="input" placeholder="点击填写"/>
				</view>
			</view>
			<view class="weui-cell weui-cell_select">
				<view class="weui-cell__hd weui-cell__hd_in-select-after">
					<view class="weui-label">院校</view>
				</view>
				<view class="weui-cell__bd">
					<picker @change="bindCollegeChange" :value="collegeIndex" :range="colleges">
						<view class="weui-select weui-select_in-select-after">{{colleges[collegeIndex]}}</view>
					</picker>
				</view>
			</view>
			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label title">人数</view>
				</view>
				<view class="weui-cell__bd">
					<input class="weui-input" name="input" placeholder="点击填写"/>
				</view>
			</view>
			<view class="weui-cell weui-cell_select">
				<view class="weui-cell__hd weui-cell__hd_in-select-after">
					<view class="weui-label">类型</view>
				</view>
				<view class="weui-cell__bd">
					<picker @change="bindTypeChange" :value="typeIndex" :range="types">
						<view class="weui-select weui-select_in-select-after">{{types[typeIndex]}}</view>
					</picker>
				</view>
			</view>
			<view class="weui-cell weui-cell_select">
				<view class="weui-cell__hd weui-cell__hd_in-select-after">
					<view class="weui-label">院系要求</view>
				</view>
				<view class="weui-cell__bd">
					<picker @change="bindDepartmentChange" :value="departmentIndex" :range="departments">
						<view class="weui-select weui-select_in-select-after">{{departments[departmentIndex]}}</view>
					</picker>
				</view>
			</view>
			<view class="weui-cell weui-cell_select">
				<view class="weui-cell__hd weui-cell__hd_in-select-after">
					<view class="weui-label">截止时间</view>
				</view>
				<view class="weui-cell__bd">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="weui-select weui-select_in-select-after">{{date}}</view>
					</picker>
				</view>
			</view>
			<view class="weui-cell">
				<view class="weui-cell__hd">
					<view class="weui-label title">招募内容</view>
				</view>
				<view class="weui-cell__bd">
					<textarea class="weui-textarea" maxlength="255" placeholder="点击填写（255字以内）" style="min-height: 280rpx" auto-height />
				</view>
			</view>
			<view class="weui-cell">
				<view class="weui-cell__bd">
					<view class="weui-uploader">
						
						<view class="weui-uploader__bd">
							<view class="weui-uploader__files" id="uploaderFiles">
								<block v-for="(item,index) of files" :key="tem">
									<view class="weui-uploader__file" @click="previewImage" :id="item">
										<image class="weui-uploader__img" :src="item" mode="aspectFill" />
									</view>
								</block>
							</view>
							<view class="weui-uploader__input-box">
								<view class="weui-uploader__input" @click="chooseImage"></view>
							</view>
						</view>
						<view class="weui-uploader__hd">
							<view class="weui-uploader__title">只支持.jpg格式</view>
						</view>
					</view>

				</view>
			</view>
			
			<button form-type="submit">下一步</button>
		</form>
	</view>
</template>

<script>
	var app = getApp();
	const common = require('../../../publicjs/common.js');
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				oosHost: app.globalData.oosHost,
				colleges: ["重庆文理学院", "重庆大学", "重庆工商大学"],
				collegeIndex: '',
				types: ["学习", "比赛", "聚会"],
				typeIndex: '',
				departments: ["计算机学院", "美术学院", "体育学院"],
				departmentIndex: '',
				date: currentDate,
				files: []
			};
		},
		// onLoad: function(options) {
		// 	common.fonts(); //获取网络字体
		// 	common.checkToken(); //检查token是否有效
		// 	this.loadActivityInfo(); //获取活动信息
		// },
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 院校选择
			bindCollegeChange: function(e) {
				console.log('picker College 发生选择改变，携带值为', e.detail.value);
	
				this.collegeIndex=e.detail.value
			},
			// 类型选择
			bindTypeChange: function(e) {
				console.log('picker Type 发生选择改变，携带值为', e.detail.value);
	
				this.typeIndex=e.detail.value
			},
			// 院系选择
			bindDepartmentChange: function(e) {
				console.log('picker Department 发生选择改变，携带值为', e.detail.value);
	
				this.departmentIndex=e.detail.value
			},
			// 截止时间
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			//上传图片
			chooseImage: function (e) {
				var that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						that.files=res.tempFilePaths
						// uni.getImageInfo({
						// 	src: res.tempFilePaths[0],
						// 	success: function (image) {
						// 		console.log(image.width);
						// 		console.log(image.height);
						// 	}
						// });
						// // 预览图片
						// uni.previewImage({
						// 	urls: res.tempFilePaths,
						// 	longPressActions: {
						// 		itemList: ['发送给朋友', '保存图片', '收藏'],
						// 		success: function(data) {
						// 			console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						// 		},
						// 		fail: function(err) {
						// 			console.log(err.errMsg);
						// 		}
						// 	}
						// });
					}
				})
			},
			previewImage: function(e){
				uni.previewImage({
					current: e.currentTarget.id, // 当前显示图片的http链接
					urls: this.data.files // 需要预览的图片http链接列表
				})
			}
		}
	};
</script>

<style scoped>
	.page{
		background: #FAF7FA;
		color: #414141;
		font-size: 28rpx
	}
	.weui-cell{
		background-color: #fff;
		margin-top: 20rpx;
	}
	.weui-cell::before{
		border-top: unset
	}
	.weui-select{
		border-right: unset
	}
</style>
