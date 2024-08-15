<script setup>
import Axios from "axios";
</script>

<template>
<div class="regular-main-page-width">
	<div>
		<h1>New Arrival</h1>
		<RouterLink class="product-card" :to="imgProductPath(product._id)" v-for="(product, index) of newArrivalProducts" :key="index">
			<div><img :src="imgSrc(product.img)"></div>
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
		imgSrc(imgFileName){
			return `${this.expressAddress}/image/products/${imgFileName}`;
		},
		imgProductPath(imgFileId){
			return `/product/${imgFileId}`
		}
	},
	mounted() {
		Axios.get(`${this.expressAddress}/store/get-product-card`
		).then((data) => {
			this.newArrivalProducts = data.data;
		}).catch((data) => {
			console.log(data);
		})
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
}
.product-card > div:nth-child(1) {
	width: 200px;
	height: 200px;
}
.product-card > div:nth-child(2), .product-card > div:nth-child(3) {
	width: 100%;
	text-align: center;
}
.product-card > div:nth-child(3) {
	font-size: 20px;
}
</style>
