<script setup>
 import Veil from "../components/Veil.vue" 
</script>

<template>
	<Veil>
		<form action="">
			<div class="section">
				<p>Username or email</p>
				<input type="text">
			</div>
			<div class="section">
				<p>Password</p>
				<input type="password">
			</div>
			<div class="button section submit-button">Sign In</div>
		</form>
	</Veil>
</template>

<script>
export default {
	name: "SignIn"
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
	widows: 100%;
}

.submit-button:hover {
	background-color: #bee1e6;
}
</style>
