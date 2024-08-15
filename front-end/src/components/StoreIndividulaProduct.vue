<script setup>
import Axios from "axios";
</script>

<template>
<div class="regular-main-page-width">
	<div class="left-display">
		<div class="feature-image">
			<div class="slide-show">
				<div :class="{'slide':true, 'feature-slide': featureIndex === index}" v-for="(image, index) in product.img" :key="index"><img :src="`${expressAddress}/image/products/${image}`"></div>
			</div>
			<div class="dots">
				<div :class="{'dot':true, 'feature-dot': featureIndex === index}" v-for="(image, index) in product.img" :key="index"></div>
			</div>
		</div>
	</div>
	<div class="right-display">
		<h1>{{ product.name }}</h1>
		<h2>${{ product.price }} CAD</h2>
		{{ product.desc }}
	</div>
</div>
</template>

<script>
export default {
	inject: ['expressAddress'],
	data() {
		return {
			featureIndex: 0,
			product: {}
		}
	},
	methods: {
		dummyFunction(millisecondWait) {
			return new Promise((resolve, reject) => { setTimeout(resolve, millisecondWait) });
		},
		async runSlideShow() {
			while (true) {
				this.featureIndex = (this.featureIndex + 1) % this.product.img.length;
				await this.dummyFunction(3000);
			}
		}
	},
	async mounted() {
		let data = await Axios.get(`${this.expressAddress}/store/get-product/${this.$route.path.split("/")[2]}`);
		this.product = data.data;
		await this.runSlideShow();
	}
}
</script>

<style scoped>
h2{
	font-weight: 100;
}
.regular-main-page-width {
	display: grid;
	grid-template-columns: 3fr 1fr;	
}
.slide-show {
	width: 100%;
	height: 400px;
	white-space: nowrap;
	position: relative;
}
.slide {
	width: 100%;
	height: 400px;
	display: inline-block;
	position: absolute;
	opacity: 0;
	transition: 0.4s ease-out;
}
.feature-slide{
	opacity: 1;
}
img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}
.dots {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 1em;
}
.dot {
	width: 1em;
	height: 1em;
	border-radius: 50%;
	border-width: 1px;
	border-style: solid;
	border-color: #cdb4db;
	margin-right: 1em;
}
.dot:last-child{
	margin-right: 0px;
}
.feature-dot {
	background-color: #cdb4db;
}
</style>
