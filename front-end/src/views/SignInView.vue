<script setup>
import Veil from "../components/Veil.vue"
import Subscription from "../subscription/Subscription"
import Axios from "axios";
</script>

<template>
	<Veil>
		<form @submit.prevent="submit">
			<div class="section">
				<p>Username or email</p>
				<input type="text" v-model="username" id="username">
			</div>
			<div class="section">
				<p>Password</p>
				<input type="password" v-model="password" id="password">
			</div>
			<button class="button section submit-button">Sign In</button>
		</form>
	</Veil>
</template>

<script>
export default {
	name: "SignIn",
	inject: ['expressAddress'],
	data() {
		return {
			username: "",
			password: ""
		}
	},
	methods: {
		submit () {
			if (this.username.length === 0) {
				Subscription.notify("notification", "red", "Username or email must be filled");
				return;
			}
			if (this.password.length === 0) {
				Subscription.notify("notification", "red", "Password must be filled");
				return;
			}
			Axios.post(`${this.expressAddress}/auth/sign-in`, {
				username: this.username,
				password: this.password
			}).then((data) => {
				console.log(data);
			}).catch((data) => {
				Subscription.notify("notification", "red", data.response.data);
			});
		}
	}
}
</script>

<style scoped>
form {
	border-radius: 10px;
	background-color: white;
	padding:5em;
}

.section {
	margin-bottom: 1em;
}

.submit-button {
	background-color: #e2ece9;
	width: 100%;
}

.submit-button:hover {
	background-color: #bee1e6;
}
</style>
