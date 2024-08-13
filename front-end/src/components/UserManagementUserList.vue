<script setup>
import SearchIcon from "./icons/Search.vue";
import AddIcon from "./icons/Add.vue";
import EditIcon from "./icons/Edit.vue"
import TrashBinIcon from "./icons/TrashBin.vue"
import StatisticIcon from "./icons/Statistic.vue"
import SelectorComponent from "./SelectorComponent.vue";
import { notification } from "../stores/Notification.js";
import Axios from "axios";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
<div class="banner">
	<div><h1>User Management</h1></div>
	<div class="flex-row">
		<div class="search-box"><input type="text" placeholder="Search"><SearchIcon /></div>
		<RouterLink to="/user-management/create-user"><div class="button green"><AddIcon /> Add user</div></RouterLink>
	</div>
</div>
<table>
	<thead>
		<th>User Id</th>
		<th>Username</th>
		<th>Email</th>
		<th>Role</th>
		<th>Action</th>
	</thead>
	<tbody>
		<tr v-for="(user, index) of userList" :key="index">
			<td>{{user._id}}</td>
			<td>{{user.username}}</td>
			<td>{{user.email}}</td>
			<td>
				<SelectorComponent :options="roleOptions" :defaultValue="user.role" @onChange="(newValue) => {onChangeRole(newValue, index)}"/>
			</td>
			<td class="flex-row">
				<div class="button small-button red" @click="onDeleteUser(index)"><TrashBinIcon/></div>
				<div class="button small-button yellow"><StatisticIcon /></div>
			</td>
		</tr>
	</tbody>
</table>
<RouterView :message="displayMessage" @confirm="onConfirm" @decline="onDecline"/>
</template>

<script>
export default {
	inject: ["expressAddress"],
	data() {
		return {
			displayMessage: "",
			roleOptions: ['admin', 'customer', 'employee', 'vendor'],
			userList: [],
			columnName: ["Username", "Role", "Email", "Action"],
			columnKey: ["username", "role", "email"]
		}
	},
	methods: {
		onConfirm() {
			const tokken = this.$route.path.split("/");
			console.log(tokken);
			if (tokken[3] === "delete-user")
				Axios.delete(`${this.expressAddress}/user-management/delete-user/${tokken[4]}`
				).then((data) => {
					notification().addNotification(data.data, "green");
					this.$router.push("/user-management/user-list");
				}).catch((data) => {
					console.log(data.response.data);
				});
			else if (tokken[3] === "update-user")
				Axios.patch(`${this.expressAddress}/user-management/update-user/${tokken[4]}`
				).then((data) => {
					console.log(data.data);
				}).catch((data) => {
					console.log(data.response.data);
				});
		},
		onDecline() {
			this.$router.push("/user-management/user-list");
		},
		onDeleteUser(index) {
			this.displayMessage = `Confirm to delete user ${this.userList[index].username}?`;
			this.$router.push(`/user-management/user-list/delete-user/${this.userList[index]._id}`);
		},
		onChangeRole(newValue, index){
			this.displayMessage = `Change role of user ${this.userList[index].username} from ${this.userList[index].role} to ${newValue}?`;
			this.$router.push(`/user-management/user-list/update-user/${this.userList[index]._id}`);
		},
	},
	mounted() {
		Axios.get(`${this.expressAddress}/user-management/get-user-list`, {
			limit: 10,
			page:0
		}).then((data)=> {
			this.userList = data.data;
		}).catch((data) => {
			console.log(data);
			this.$router.push("/sign-in");
			
		});
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
.small-button {
	width:2em;
	height:2em;
}
</style>
