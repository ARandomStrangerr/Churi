<script setup>
	import Veil from "../components/Veil.vue"
	import Axios from "axios"
	import Subscription from "../subscription/Subscription.js"
</script>

<template>
	<Veil>
		<form @submit.prevent="register">
			<div class="section">
				<label for="username">Username</label>
				<input type="text" v-model="username" id="username">
			</div>
			<div class="section">
				<label for="password">Password</label>
				<input type="password" v-model="password" id="password">
			</div>
			<div class="section">
				<label for="email">Email</label>
				<input type="email" v-model="email" id="email">
			</div>
			<button type="submit" class="button submit-button">Register</button>
		</form>
	</Veil>
</template>

<script>
export default {
	name: "SignUp",
	inject: ['expressAddress'],
	data() {
		return {
			username: "",
			password: "",
			email: ""
		}
	},
	methods: {
		async register(){
			if (this.username.length === 0){
				Subscription.notify("notification", "red", "Username must be filled");
				return;
			}
			if (this.password.length ===0){
				Subscription.notify("notification", "red", "password must be filled");
				return;
			}
			if (this.email.length === 0){
				Subscription.notify("notification", "red", "email must be filled");
				return;
			}
			Axios.post(`http://localhost:5172/auth/sign-up`,{
				username: this.username,
				password: this.password,
				email: this.email
			});
		}
	},
	mounted() {
	}
}
</script>

<style scoped>
form {
	border-radius: 10px;
	background-color: white;
	padding: 5em;
}

.section {
	margin-bottom: 1em;
}

label {
	display: block;
}

.submit-button {
	background-color: #e2ece9;
	widows: 100%;
}

.submit-button:hover {
	background-color: #bee1e6;
}
</style>
