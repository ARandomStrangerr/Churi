<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
	<div class="side-bar">
		<img src="../assets/logo-1.png" alt="logo">
		<RouterLink to="/user-management/user-list">User List</RouterLink>
		<RouterLink to="/user-management/product-list">Product List</RouterLink>
	</div>
</template>

<style scoped>
.side-bar {
	display: flex;
	flex-direction: column;
	width: 10vw;
}
</style>
