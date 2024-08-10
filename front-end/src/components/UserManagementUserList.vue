<script setup>
import SearchIcon from "./icons/Search.vue";
import AddIcon from "./icons/Add.vue";
import EditIcon from "./icons/Edit.vue"
import TrashBinIcon from "./icons/TrashBin.vue"
import TableComponent from "./UserManagementTable.vue"
import Axios from "axios";
import { RouterLink } from "vue-router";
</script>

<template>
<div class="banner">
	<div><h1>User Management</h1></div>
	<div class="flex-row">
		<div class="search-box"><input type="text" placeholder="Search"><SearchIcon /></div>
		<RouterLink to="/user-management/create-user"><div class="button green"><AddIcon /> Add user</div></RouterLink>
	</div>
</div>
<TableComponent :columnName="columnName" :columnKey="columnKey" :tableData="userList"/>
</template>

<script>
export default {
	inject: ["expressAddress"],
	data() {
		return {
			editPath: "edit-user",
			deletePath: "user-management/delete-user",
			userList: [],
			columnName: ["Username", "Role", "Email", "Action"],
			columnKey: ["username", "role", "email"]
		}
	},
	mounted() {
		Axios.get(`${this.expressAddress}/user-management/get-user-list`, {
			limit: 10,
			page:0
		}).then((data)=> {
			this.userList = data.data;
			for (let i of this.userList){
				i.deleteURL = `${this.expressAddress}/user-management/delete/${i._id}`;
				i.editURL = `/user-management/edit-user/${i._id}`;
			}
		}).catch((data) => {
			this.$router.push("/sign-in");
			//Subscription.notify("notification", "red", data.response.data);
		})
	}
}
</script>

<style scoped>
.user-edit-button {
	display: inline-flex;
	width: 2em;
	height: 2em;
	border-radius: 4px;
	margin-right: 1em;
}
.user-edit-button:last-child {
	margin-right: 0px;
}
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
