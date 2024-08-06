<script setup>
import SearchIcon from "./icons/Search.vue";
import AddIcon from "./icons/Add.vue"
import TableComponent from "./Table.vue"
import { RouterLink } from "vue-router";
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
<TableComponent :columnName="columnName" :columnKey="columnKey" :tableData="productList"/>
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
	mounted() {
		Axios.get(`${this.expressAddress}/user-management/get-product-list`, {}
		).then((data) => {
			this.productList = data.data;
			console.log(data.data);
			for (let i of this.productList){
				i.deleteURL = `${this.expressAddress}/user-management/delete-product/${i._id}`;
				i.editURL = `/user-management/edit-product/${i._id}`;
			}
		}).catch((data) => {
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
