<script setup>
import searchIcon from "./icons/Search.vue";
import Axios from "axios";
import Subscription from "../subscription/Subscription";
</script>

<template>
<div class="container">
	<div class="banner">
		<div><h1>User Management</h1></div>
		<div class="search-box"><input type="text" placeholder="Search"><searchIcon /></div>
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
			Subscription.notify("notification", "red", data.response.data);
		})
	}
}
</script>

<style scoped>
.container {
	flex-grow: 1;
	display:flex;
	flex-direction: column;
}
.banner {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.search-box {
	height:2em;
	padding: 0.5em;
	border-radius: 1em;
	border-style: solid;
	border-width: 1px;
	display: flex;
	flex-direction: row;
	justify-items: center;
	align-items: center;
	border-color: #cddafd;
}
.search-box svg {
	width: 1em;
	height: 1em;
}
.search-box input {
	border-style: none;
	border-width: 0px;
}
.user-table {
	margin: 1em 0em 3em 0em;
	width: 100%;
	border-radius: 1em;
	/* border-style: solid; */
	border-width: 1px;
	border-color: #cddafd;
}

td {
	border-width: 0px 0px 1px 0px;
	border-style: solid;
	border-color: #edf6f9;
	height: 3em;
}

.user-table tr:first-child td {
	background-color: #edf6f9;
	padding-left: 1em;
}

.user-table tr:first-child td:first-child {
	border-bottom-left-radius: 7px;
	border-top-left-radius: 7px;
}

.user-table tr:first-child td:last-child {
	border-bottom-right-radius: 7px;
	border-top-right-radius: 7px;
}
</style>
