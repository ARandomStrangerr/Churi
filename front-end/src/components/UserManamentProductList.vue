<script setup>
import SearchIcon from "./icons/Search.vue";
import AddIcon from "./icons/Add.vue"
import Axios from "axios";
</script>

<template>
<div class="user-management-content">
	<div class="banner">
		<div><h1>Product Management</h1></div>
		<div class="flex-row">
			<div class="search-box"><input type="text" placeholder="Search"><searchIcon /></div>
			<div class="button green"><AddIcon />Add Product</div>
		</div>
	</div>
	<table>
		<tbody>
			<tr>
				<td>Name</td>
				<td>Owner</td>
				<td>Price</td>
				<td>Stock</td>
				<td>Discount</td>
			</tr>
			<tr v-for="(product, index) in productList" :key="index">
				<td>{{product.name}}</td>
				<td>{{product.owner}}</td>
				<td>{{product.price}}</td>
				<td>{{product.stock}}</td>
				<td>{{product.discount}}</td>
			</tr>
		</tbody>
	</table>
</div>
</template>

<script>
export default {
	inject: ["expressAddress"],
	data() {
		return {
			productList: []
		}
	},
	mounted() {
		Axios.get(`${this.expressAddress}/user-management/get-product-list`, {}
		).then((data) => {
			this.productList = data.data;			
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
