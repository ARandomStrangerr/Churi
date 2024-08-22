<script setup>
import Axios from "axios";
</script>

<template>
<div class="regular-main-page-width">
	<div>
		<h1>New Arrival</h1>
		<RouterLink class="product-card" :to="`/product/${product._id}`" v-for="(product, index) of newArrivalProducts" :key="index" @mouseover="mouseover(product)" @mouseout="mouseout(product)">
			<div><img v-for="(img, imgIndex) in product.image" :key="imgIndex" :src="`${expressAddress}/store/get-image/${img}`" :class="{'active': product.featureImage === imgIndex}"></div>
			<div>{{product.name}}</div>
			<div>${{product.price}} CAD</div>
		</RouterLink>
	</div>
</div>
</template>

<script>
export default {
	inject: ['expressAddress'],
	data() {
		return {
			newArrivalProducts:[]
		}
	},
	methods: {
		waitFunction(milliseconds) {
			return new Promise((resolve, reject) => { setTimeout(resolve, milliseconds) });
		},
		async mouseover(product) {
			if (product.mouseon) {
				console.log("termination due to another instance");
				return;
			}
			product.mouseon = true;
			let count = 0;
			while (product.mouseon) {
				product.featureImage = (product.featureImage + 1) % product.image.length;
				console.log (count += 1);
				await this.waitFunction(3000);
			}
			return;
		},
		mouseout(product) {
			product.mouseon = false;
		}
	},
	mounted() {
		Axios.get(`${this.expressAddress}/store/get-product-card`
		).then((data) => {
			this.newArrivalProducts = data.data;
			for (let product of this.newArrivalProducts) {
				product.featureImage = 0;
			}
		}).catch((data) => {
			console.log(data);
		});
	}
}
</script>

<style scoped>
.product-card {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 230px;
	border-width: 1px;
	padding: 1em;
	border-radius: 4px;
	border-style: solid;
	border-color: white;
	transition: 0.4s;
}
.product-card:hover {
	border-color: #cdb4db;
}
.product-card img {
	max-width: 100%;
	max-height: 100%;
	border-radius: 4px;
	object-fit: contain;
	position: absolute;
	opacity: 0;
	transition: ease-out 0.4s;
}
.product-card img.active {
	opacity: 1;
}
.product-card > div:nth-child(1) {
	width: 200px;
	height: 200px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

}
.product-card > div:nth-child(2), .product-card > div:nth-child(3) {
	width: 100%;
	text-align: center;
}
.product-card > div:nth-child(3) {
	font-size: 20px;
}
</style>
