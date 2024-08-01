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
			<RouterLink to="/"><img src="../assets/logo-1.png" alt="Logo" class="centered-image"></RouterLink>
			<div class="right-sub-container">
				<ShoppingBagIcon />
				<div class="drop-container" v-if="isSignedIn">
					<div>UserPotrait</div>
					<div>
						<RouterLink to="/user-management"><div>Dashboard</div></RouterLink>
						<div>Sign out</div>
					</div>
				</div>
				<div v-else class="right-sub-container">
					<RouterLink to="/sign-up"><div class="button" data-test="sign-up-button">Sign up</div></RouterLink>
					<RouterLink to="/sign-in"><div class="button" data-test="sign-in-button">Sign in</div></RouterLink>
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
			isSignedIn: false
		}
	},
	async mounted() {
		this.isSignedIn = await signInState().isSignedIn();
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
