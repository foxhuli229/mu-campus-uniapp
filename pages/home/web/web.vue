<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		name: 'web',
		props:{
			url: {
				type: String,
				url: ''
			}
		},
		data() {
			return {
				
			}
		},
		onLoad(option) {
			console.log(option);
			if(option != null && typeof option.url != "undefined") {
				this.url = decodeURIComponent(option.url);
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
