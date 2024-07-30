<script setup>
import AddIcon from "./icons/Add.vue";
import LeftArrow from "./icons/LeftArrow.vue"
import RightArrow from "./icons/RightArrow.vue";
import Cross from "./icons/Cross.vue"
</script>

<template>
<div class="banner">
	<h1>Create Prodcut</h1>
	<div class="button green"><AddIcon />Save</div>
</div>
<form @submit.prevent="submit">
	<h2>General Information</h2>
	<h3><label for="display-name">Display Name</label></h3>
	<input type="text" id="display-name">
	<h3><label for="desc">Description</label></h3>
	<textarea id="desc"></textarea>
	<h2>Product Photo</h2>
	<div class="image-container flex-row">
		<div v-for="(imgURL, index) in displayImagesURL" :key=index>
			<img :src="imgURL">
			<div class="left-arrow-button" v-on:click="moveImageLeft(index)"><LeftArrow /></div>
			<div class="right-arrow-button" v-on:click="moveImageRight(index)"><RightArrow /></div>
			<div class="cross-button" v-on:click="deleteImage(index)"><Cross /></div>
		</div>
		<input type="file" id="image-input" @change="fileInputChange" multiple>	
	</div>
</form>
</template>

<script>
export default {
	data(){
		return {
			uploadImages: [],
			displayImagesURL: []
		}
	},
	methods: {
		fileInputChange(event) {
			this.uploadImages = Array.from(event.target.files);
			for (let file of event.target.files) {
				this.displayImagesURL.push(URL.createObjectURL(file));
			}
		},
		deleteImage(index) {
			this.uploadImages.splice(index, 1);
			this.displayImagesURL.splice(index, 1);
		},
		moveImageLeft(index) {
			if (index == 0) return;
			let [rmvEle] = this.uploadImages.splice(index, 1);
			this.uploadImages.splice(index-1, 0, rmvEle);
			let [rmvFile] = this.displayImagesURL.splice(index, 1);
			this.displayImagesURL.splice(index-1, 0, rmvFile);
		},
		moveImageRight(index) {
			if (index == this.uploadImages.length - 1) return;
			let [rmvEle] = this.uploadImages.splice(index,1);
			this.uploadImages.splice(index,0,rmvEle);
			[rmvEle] = this.displayImagesURL.splice(index,1);
			this.uploadImages.splice(index,0,rmvEle);
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
