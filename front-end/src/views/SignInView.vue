<script setup>
import Veil from "../components/Veil.vue"
import Axios from "axios";
import { signInState } from "../stores/SignInState"
import { notification } from "@/stores/Notification";
</script>

<template>
	<Veil>
		<form @submit.prevent="submit">
			<div class="section">
				<p>Username or email</p>
				<input type="text" v-model="username" id="username" data-test="username-input">
			</div>
			<div class="section">
				<p>Password</p>
				<input type="password" v-model="password" id="password" data-test="password-input">
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
				notification().addNotification("Username must be filled", "red");
				return;
			}
			if (this.password.length === 0) {
				notification().addNotification("Password must be filled", "red");
				return;
			}
			Axios.post(`${this.expressAddress}/auth/sign-in`, {
				username: this.username,
				password: this.password
			}).then((data) => {
				notification().addNotification(data.data, "green")
				this.$router.push("/");
			}).catch((data) => {
				//Subscription.notify("notification", "red", data.response.data);
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
