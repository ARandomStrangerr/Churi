<script setup>
import AddIcon from "./icons/Add.vue";
import LeftArrow from "./icons/LeftArrow.vue"
import RightArrow from "./icons/RightArrow.vue";
import Cross from "./icons/Cross.vue"
import Axios from "axios";
import { useRoute } from 'vue-router';
import { notification } from "../stores/Notification.js"
</script>

<template>
<div>
	<h1>Create Prodcut</h1>
</div>
<form @submit.prevent="submit" enctype="multipart/form-data">
	<div class="banner">
		<h2>General Information</h2>
		<button class="button green" @submit.prevent="submit"><AddIcon />Save</button>
	</div>
	<h3><label for="display-name">Display Name</label></h3>
	<input type="text" v-model="displayName" id="display-name">
	<h3><label for="desc">Description</label></h3>
	<textarea id="desc" v-model="description"></textarea>
	<h2>Product Photo</h2>
	<div class="image-container flex-row">
		<div v-for="(file, index) in uploadImageFiles" :key=index>
			<img :src="getFileURL(file)">
			<div class="left-arrow-button" v-on:click="moveImageLeft(index)"><LeftArrow /></div>
			<div class="right-arrow-button" v-on:click="moveImageRight(index)"><RightArrow /></div>
			<div class="cross-button" v-on:click="deleteImage(index)"><Cross /></div>
		</div>
		<input type="file" id="image-input" @change="fileInputChange" multiple>
	</div>
	<h2>Pricing</h2>
	<div class="flex-row">
		<div>
			<h3>Stock</h3>
			<input type="number" v-model="stock" value="0">
		</div>
		<div>
			<h3>Price</h3>
			<input type="number" v-model="price" value="0">
		</div>
		<div>
			<h3>Discount</h3>
			<input type="number" v-model="discount" value="0">
		</div>
	</div>
</form>
</template>

<script>
export default {
	inject: ["expressAddress"],
	data(){
		return {
			productId: null,
			uploadImageFiles: [],
			displayName: "",
			description: "",
			stock: 0,
			discount: 0,
			price: 0
		}
	},
	methods: {
		fileInputChange(event) {
			Array.from(event.target.files).forEach(file => this.uploadImageFiles.push(file));
		},
		deleteImage(index) {
			this.uploadImageFiles.splice(index, 1);
		},
		moveImageLeft(index) {
			if (index === 0) return;
			let [rmvEle] = this.uploadImageFiles.splice(index, 1);
			this.uploadImageFiles.splice(index-1, 0, rmvEle);
		},
		moveImageRight(index) {
			if (index === this.uploadImages.length - 1) return;
			let [rmvEle] = this.uploadImageFiles.splice(index,1);
			this.uploadImages.splice(index + 1 , 0, rmvEle);
		},
		getFileURL (file) {
			if (typeof file === "object") return URL.createObjectURL(file);
			return `${this.expressAddress}/image/products/${file}`;
		},
		submit() {
			let URL = this.productId ? `${this.expressAddress}/user-management/update-product/${this.productId}` : `${this.expressAddress}/user-management/create-product`;
			let method = this.productId ? "patch" : "post";
			const formData = new FormData();
			formData.append("name", this.displayName);
			this.uploadImageFiles.forEach(file => formData.append("uploadImageFiles", file));
			if (this.productId) this.uploadImageFiles.forEach(file => formData.append("imageName", typeof file === "object" ? file.name : file));
			formData.append("desc", this.description);
			formData.append("stock", this.stock);
			formData.append("discount", this.discount);
			formData.append("price", this.price);
			Axios[method](URL, formData, {
				headers: {
					"Content-Type": "mulitpart/form-data"
				}
			}).then((data) => {
				console.log(data);
			}).catch((data) => {
				console.log(data);
			});
		}
	},
	mounted() {
		const routeTokkens = useRoute().path.split("/");
		this.productId = routeTokkens[3] ? routeTokkens[3] : null;
		if (this.productId) {
			Axios.get(`${this.expressAddress}/user-management/get-product/${this.productId}`
			).then((data) => {
				this.displayName = data.data.name;
				this.description = data.data.desc;
				this.discount = data.data.discount;
				this.price = data.data.price;
				this.stock = data.data.stock;
				this.uploadImageFiles = data.data.img;
			}).catch((data) => {
				console.log(data)
				notification().addNotification(data.response.data, "red");
				this.$router.push("/");
			})
		}
	}
}
</script>

<style scoped>
.banner {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.flex-row {
	justify-content: space-between;
}
.image-container {
	justify-content: left;
	overflow-x: scroll;
	overflow-y: hidden;
	height: 180px;
}
.image-container > div {
	width: 160px;
	height: 90px;
	border: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #edf6f9;
	flex-shrink: 0;
	margin-right: 1em;
	position: relative;
}
.image-container > div > img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}
.left-arrow-button, .right-arrow-button, .cross-button {
	position: absolute;
	width: 1.5em;
	height: 1.5em;
	border-radius: 50%;
	background-color: #edf6f9;
	display: flex;
	justify-content: center;
	align-items: center;
}
.left-arrow-button {
	bottom: -1em;
	left: 40px;
}
.right-arrow-button {
	bottom: -1em;
	right: 40px;
}
.cross-button{
	top: -0.5em;
	right: -0.5em;
	background-color: #c9184a;
}
label {
	display: block;
}
input {
	padding: 0.5em 1em 0.5em 1em;
	border-width: 1px;
	border-radius: 4px;
}
form {
	width: 60%;
	display: flex;
	flex-direction: column;
}
textarea{
	height: 5em;
	padding: 0.5em 1em 0.5em 1em;
	border-width: 1px;
	border-radius: 4px;
	border-color: #e2ece9;
	border-style: solid;
	font-size: 14px;
	resize: none;
}
textarea:focus{
	border-color: #bee1e6;
	outline: none;
}
</style>
