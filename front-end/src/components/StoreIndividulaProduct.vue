<script setup>
import Axios from "axios";
</script>

<template>
<div class="regular-main-page-width">
	<div class="left-display">
		<div class="feature-image">
			<div class="slide-show" v-if="product.variant">
				<div :class="{'slide':true, 'feature-slide': featureImageIndex === imageIndex}" v-for="(image, imageIndex) in product.variant[featureVariantIndex].image" :key="imageIndex">
					<img :src="`${expressAddress}/store/get-image/${image}`">
				</div>
			</div>
			<div class="dots" v-if="product.variant">
				<div :class="{'dot':true, 'feature-dot': featureImageIndex === imageIndex}" v-for="(image, imageIndex) in product.variant[featureVariantIndex].image" :key="imageIndex"></div>
			</div>
		</div>
	</div>
	<div class="right-display">
		<h2>{{ product.ownerName}}</h2>
		<h1>{{ product.name }}</h1>
		<div><div v-for="(variant, variantIndex) in product.variant" :key="variantIndex" :class="{'button': true, 'active': variantIndex === featureVariantIndex}" @click="selectVariant(variantIndex)">{{ variant.name }}</div>
		<h2 v-if="product.variant">${{ Number(product.variant[featureVariantIndex].price).toFixed(2) }} CAD</h2>
		</div>
		{{ product.description }}
	</div>
</div>
</template>

<script>
export default {
	inject: ['expressAddress'],
	data() {
		return {
			featureImageIndex: 0,
			featureVariantIndex: 0,
			product: {}
		}
	},
	methods: {
		dummyFunction(millisecondWait) {
			return new Promise((resolve, reject) => { setTimeout(resolve, millisecondWait) });
		},
		async runSlideShow() {
			while (this.product.variant[this.featureVariantIndex].image) {
				this.featureImageIndex = (this.featureImageIndex + 1) % this.product.variant[this.featureVariantIndex].image.length;	
				await this.dummyFunction(3000);
			}
		},
		selectVariant(selectedVariantIndex) {
			this.featureVariantIndex = selectedVariantIndex;
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
.button {
	border-color: #cdb4db;
	margin-right: 1em;
}
.button.active{
	background-color: #cdb4db;
}
</style>
