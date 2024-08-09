<script setup>
import SearchIcon from "./icons/Search.vue";
import AddIcon from "./icons/Add.vue"
import TableComponent from "./Table.vue"
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
<TableComponent :columnName="columnName" :columnKey="columnKey" :tableData="productList" @onEdit="onEditItem" @onDelete="onDeleteItem"/>
<RouterView :message="'Confirm to delete the Item?'" @confirm="onConfirmDialogue" @decline="onDeclineDialogue"/>
</template>

<script>
export default {
	inject: ["expressAddress"],
	data() {
		return {
			productList: [],
			columnName: ["Name", "Owner", "Price", "Stock", "Discount", "Action"],
			columnKey: ["name", "owner", "price", "stock", "discount"]
		}
	},
	methods: {
		onEditItem(index) {
			this.$router.push(`/user-management/edit-product/${this.productList[index]._id}`);
		},
		onDeleteItem(index) {
			this.$router.push(`/user-management/product-list/delete-product/${this.productList[index]._id}`);
		},
		onConfirmDialogue() {
			const productId = this.$route.path.split("/")[4];
			this.$router.push("/user-management/product-list");
			Axios.delete(`${this.expressAddress}/user-management/delete-product/${productId}`
			).then((data) => {
				notification().addNotification(data.data, "green");
			}).catch((data) => {
				notification().addNotification(data.response.data, "red");
			});
		},
		onDeclineDialogue() {
			this.$router.push("/user-management/product-list");
		}
	},
	mounted() {
		Axios.get(`${this.expressAddress}/user-management/get-product-list`
		).then((data) => {
			this.productList = data.data;
		}).catch((data) => {
			notification().addNotification(data.response.data, "red");
			this.$router.push("/sign-in");
		})
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
</style>
