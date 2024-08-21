<script setup>
import SearchIcon from "./icons/Search.vue";
import AddIcon from "./icons/Add.vue"
import TrashBinIcon from "./icons/TrashBin.vue";
import EditIcon from "./icons/Edit.vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { notification } from "../stores/Notification";
import Axios from "axios";
</script>

<template>
<div class="banner">
	<div><h1>Product Management</h1></div>
	<div class="flex-row">
		<div class="search-box"><input type="text" placeholder="Search"><searchIcon /></div>
		<RouterLink to="/user-management/create-product"><div class="button green"><AddIcon />Add Product</div></RouterLink>
	</div>
</div>
<table>
	<thead>
		<tr>
			<th>Product ID</th>
			<th>Product Name</th>
			<th>Owner</th>
			<th>Category</th>
			<th>Published</th>
			<th>Variant</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		<tr v-for="(product, index) in productList" :key="index">
			<td>{{ product._id }}</td>
			<td>{{ product.name }}</td>
			<td>{{ product.ownerUsername }}</td>
			<td>{{ product.category }}</td>
			<td>
				<div class="toggle-button" @click="togglePublicationStatus(index)">
					<div :class="{'slider':true, 'right':!product.published}"></div>
					<div class="display-text">Published</div>
					<div class="display-text">Unpublished</div>
				</div>
			</td>
			<td>{{ product.variant }}</td>
			<td>
				<div class="button yellow" @click="onEditItem(index)"><EditIcon /></div>
				<div class="button red" @click="onDeleteItem(index)"><TrashBinIcon /></div>
			</td>
		</tr>
	</tbody>
</table>
<RouterView :message="message" @confirm="onConfirmDialogue" @decline="onDeclineDialogue"/>
</template>

<script>
export default {
	inject: ["expressAddress"],
	data() {
		return {
			productIndex: 0,
			message: "",
			productList: []
		}
	},
	methods: {
		onEditItem(index) {
			this.$router.push(`/user-management/edit-product/${this.productList[index]._id}`);
		},
		onDeleteItem(index) {
			this.message = `Confirm to detete the product ${this.productList[index]._id} - ${this.productList[index].name}?`;
			this.$router.push(`/user-management/product-list/delete-product/${this.productList[index]._id}`);
		},
		onConfirmDialogue() {
			const tokkens = this.$route.path.split("/");
			this.$router.push("/user-management/product-list");
			if (tokkens[3] === "delete-product")
				Axios.delete(`${this.expressAddress}/user-management/delete-product/${tokkens[4]}`
				).then((data) => {
					notification().addNotification(data.data, "green");
				}).catch((data) => {
					notification().addNotification(data.response.data, "red");
				});
			else if (tokkens[3] === "change-publication-status")	
				Axios.patch(`${this.expressAddress}/user-management/update-product-publication/${tokkens[4]}`
				).then((data) => {
					this.productList[this.productIndex].published = !this.productList[this.productIndex].published;
					notification().addNotification(data.data, "green");
				}).catch((data) => {
					console.log(data);
				});
		},
		onDeclineDialogue() {
			this.$router.push("/user-management/product-list");
		},
		togglePublicationStatus(index){
			this.message = `Confirm to change the publication status of ${this.productList[index]._id} - ${this.productList[index].name}?`;
			this.productIndex = index;
			this.$router.push(`/user-management/product-list/change-publication-status/${this.productList[index]._id}`);
		}
	},
	mounted() {
		Axios.get(`${this.expressAddress}/user-management/get-product-list`
		).then((data) => {
			this.productList = data.data;
		}).catch((data) => {
			notification().addNotification(data.response.data, "red");
			this.$router.push("/sign-in");
		});
	}
}
</script>

<style scoped>
.container{
	display: flex;
	flex-direction: column;
}
.banner {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.search-box{
	margin-right: 1em;
}
.button {
	border-radius: 4px;
	margin-right: 1em;
}
.button:last-child{
	margin-right: 0px;
}
.toggle-button {
	background-color: #e9ecef;
	position: relative;
	border-radius: 4px;
	display: inline-flex;
	padding: 4px;
	cursor: pointer;
	user-select: none;
}
.toggle-button > div {
	display: grid;
	place-items: center;
	width: 7em;
	height: 2em;
}
.toggle-button > .slider {
	position: absolute;
	border-radius: 4px;
	background-color: #a2d2ff;
	transition: 0.4s;
}
.toggle-button > .slider.right {
	transform: translateX(100%);
	background-color: #ffafcc;
}
.toggle-button > .display-text {
	position: relative;
	z-index: 1;
}
</style>
