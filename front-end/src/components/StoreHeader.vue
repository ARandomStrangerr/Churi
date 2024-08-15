<script setup>
	import ShoppingBagIcon from "./icons/ShoppingBag.vue";
	import SearchIcon from "./icons/Search.vue";
	import {RouterLink, RouterView} from 'vue-router';
	import { signInState } from "../stores/SignInState"
</script>

<template>
<header>
	<div class="regular-main-page-width header-top">
		<div><SearchIcon /></div>
		<div><RouterLink to="/"><img src="../assets/logo-1.png" alt="Logo" class="centered-image"></RouterLink></div>
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
	<nav class="regular-main-page-width nav-bar">
		<div>Home</div>
		<div>App Products</div>
		<div>Handmade</div>
		<div>Jewelry</div>
		<div>Crochet</div>
		<div>BC Locals</div>
	</nav>
</header>
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
.header-top {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
}
.header-top > div {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.header-top > div:nth-child(2) {
	justify-content: center;
}
.header-top > div:nth-child(3) {
	justify-content: flex-end;
}
.nav-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-grow: 0;
}
.right-sub-container {
	display: flex;
	flex-direction: row;
}
</style>
