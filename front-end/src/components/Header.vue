<script setup>
	import ShoppingBagIcon from "./icons/ShoppingBag.vue";
	import SearchIcon from "./icons/Search.vue";
	import Notification from "./Notification.vue";
	import {RouterLink, RouterView} from 'vue-router';
	import { signInState } from "../stores/SignInState"
</script>

<template>
	<header>
		<div class="container">
			<SearchIcon />
			<img src="../assets/logo-1.png" alt="Logo" class="centered-image">
			<div class="right-sub-container">
				<ShoppingBagIcon />
				<div v-if="!signInStateManagement.isSignedIn" class="right-sub-container">
					<RouterLink to="/sign-up"><div class="button">Sign up</div></RouterLink>
					<RouterLink to="/sign-in"><div class="button">Sign in</div></RouterLink>
				</div>
				<div v-else>
					SIGN OUT NOW!!!
				</div>
			</div>
		</div>
	</header>
	<Notification />
	<RouterView />
</template>

<script>
export default {
	data(){
		return {
			signInStateManagement: signInState()
		}
	}
}
</script>

<style scoped>
.container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.centered-image {
	position: fixed;
	left: 50%;
}
.right-sub-container {
	display: flex;
	flex-direction: row;
}
</style>
