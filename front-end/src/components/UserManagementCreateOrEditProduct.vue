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
	<h1>{{ productId ? `Update Product ${productId}` : `Create Product` }}</h1>
</div>
<form @submit.prevent="submit" enctype="multipart/form-data">
	<div class="banner">
		<h2>General Information</h2>
		<button class="button green" @submit.prevent="submit"><AddIcon />Save</button>
	</div>
	<div class="three-one-grid">
		<div>
			<h3><label for="display-name">Display Name</label></h3>
			<input type="text" v-model="name" id="display-name">
		</div>
		<div>
			<h3><label>Category</label></h3>
			<input type="text" v-model="category">
		</div>	
	</div>
	<h3><label for="desc">Description</label></h3>
	<textarea id="desc" v-model="description"></textarea>
	<div class="flex-row">
		<h2>Variant</h2>
		<div class="button green" @click="addVariant"><AddIcon />Add Variant</div>
	</div>
	<div class="variant" v-for="(variant, variantIndex) in variants" :key="variantIndex">
		<h3>Variant Name</h3>
		<input type="text" v-model="variant.name">
		<h3>Product Photo</h3>
		<div class="image-container flex-row">
			<div v-for="(file, imageIndex) in variant.imageFiles" :key="imageIndex">
				<img :src="getFileURL(file)">
				<div class="left-arrow-button" v-on:click="moveImageLeft(variantIndex, imageIndex)"><LeftArrow /></div>
				<div class="right-arrow-button" v-on:click="moveImageRight(variantIndex, imageIndex)"><RightArrow /></div>
				<div class="cross-button" v-on:click="deleteImage(variantIndex, imageIndex)"><Cross /></div>
			</div>
			<input type="file" id="image-input" @change="fileInputChange($event, variantIndex)" multiple>
		</div>
		<h2>Pricing</h2>
		<div class="flex-row">
			<div>
				<h3>Stock</h3>
				<input type="number" v-model="variant.stock" value="0">
			</div>
			<div>
				<h3>Price</h3>
				<input type="number" v-model="variant.price" value="0">
			</div>
			<div>
				<h3>Discount</h3>
				<input type="number" v-model="variant.discount" value="0">
			</div>
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
			name: "",
			category: "",
			description: "",
			variants: []
		}
	},
	methods: {
		addVariant(){
			this.variants.push({
				name: "",
				imageFile: [],
				stock: 0,
				price: 0,
				discount: 0
			});
		},
		fileInputChange(event, variantIndex) {
			for (let file of event.target.files) {
				this.variants[variantIndex].imageFiles.push(file);
			}
		},
		deleteImage(variantIndex, imageIndex) {
			this.variants[variantIndex].imageFiles.splice(imageIndex, 1);
		},
		moveImageLeft(variantIndex, imageIndex) {
			if (imageIndex === 0) return;
			let [rmvEle] = this.variants[variantIndex].imageFiles.splice(imageIndex, 1);
			this.variants[variantIndex].imageFiles.splice(imageIndex - 1, 0, rmvEle);
		},
		moveImageRight(variantIndex, imageIndex) {
			if (imageIndex === this.variants[variantIndex].imageFiles.length - 1) return;
			let [rmvEle] = this.variants[variantIndex].imageFiles.splice(imageIndex,1);
			this.variants[variantIndex].imageFiles.splice(imageIndex + 1 , 0, rmvEle);
		},
		getFileURL (file) {
			if (typeof file === "object") return URL.createObjectURL(file);
			return `${this.expressAddress}/user-management/get-image/${file}`;
		},
		submit() {
			const formData = new FormData();
			formData.append("name", this.name);
			formData.append("category", this.category);
			formData.append("description", this.description);
			for (let variant of this.variants) {
				let temp = {
					name: variant.name,
					imageFileName: [],
					stock: variant.stock,
					price: variant.price,
					discount: variant.discount
				};
				for (let imageFile of variant.imageFiles){
					formData.append("uploadFile", imageFile);
					temp.imageFileName.push(imageFile.name);
				}
				formData.append("variant[]", JSON.stringify(temp));
			}
			Axios[this.productId ? "patch" : "post"](this.productId ? `${this.expressAddress}/user-management/update-product/${this.productId}` : `${this.expressAddress}/user-management/create-product`, formData, {
				headers: {
					"Content-Type": "mulitpart/form-data"
				}
			}).then((data) => {
				console.log(data);
				notification().addNotification(`Successfully ${this.productId ? "update" : "create"} product`, "green");
				this.$router.push("/user-management/product-list");
			}).catch((data) => {
				console.log(data);
				notification().addNotification("Failure to create product", "red");
			});
		}
	},
	mounted() {
		const routeTokkens = useRoute().path.split("/");
		this.productId = routeTokkens[3] ? routeTokkens[3] : null;
		if (this.productId) {
			Axios.get(`${this.expressAddress}/user-management/get-product/${this.productId}`
			).then((data) => {
				this.name = data.data.name;
				this.category = data.data.category;
				this.description = data.data.description;
				this.variants = data.data.variant;
				for (let variant of this.variants) {
					variant.imageFiles = variant.image;
					delete variant.image;
				}
				console.log(this.variants);
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
.variant {
	border-style: solid;
	border-width: 0px 0px 1px 0px;
	border-color: #cdb4db;
	padding-bottom: 1em;
}
</style>
