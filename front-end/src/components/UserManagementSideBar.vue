<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
	<div class="side-bar">
		<img src="../assets/logo-1.png" alt="logo">
		<RouterLink to="/user-management/user-list">User List</RouterLink>
	</div>
</template>

<style scoped>
.side-bar {
	width: 20vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
}
</style>
