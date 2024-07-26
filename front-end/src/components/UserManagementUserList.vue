<script setup>
import SearchIcon from "./icons/Search.vue";
import AddIcon from "./icons/Add.vue";
import Subscription from "../subscription/Subscription";
import Axios from "axios";
</script>

<template>
<div class="user-management-content">
	<div class="banner">
		<div><h1>User Management</h1></div>
		<div class="flex-row">
			<div class="search-box"><input type="text" placeholder="Search"><SearchIcon /></div>
			<div class="button green"><AddIcon /> Add user</div>
		</div>
	</div>
	<!-- make this table has adjustable rows -->
	<table class="user-table">
		<tbody>
			<tr>
				<td>Username</td>
				<td>Role</td>
				<td>Email</td>
				<td>Make up role</td>
			</tr>
			<tr v-for="(user, index) in userList" :key="index">
				<td>{{user.username}}</td>
				<td>{{user.role}}</td>
				<td>{{user.email}}</td>
				<td></td>
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
			userList: []
		}
	},
	mounted() {
		Axios.get(`${this.expressAddress}/user-management/get-user-list`, 
			{
				limit: 10,
				page:0
			}
		).then((data)=> {
			this.userList = data.data;
		}).catch((data) => {
			this.$router.push("/sign-in");
			//Subscription.notify("notification", "red", data.response.data);
		})
	}
}
</script>

<style scoped>
.banner {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.search-box {
	margin-right: 1em;
}
</style>
