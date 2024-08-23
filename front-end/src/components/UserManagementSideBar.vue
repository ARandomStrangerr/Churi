<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
	<div class="side-bar">
		<RouterLink to="/"><img src="../assets/logo-1.png" alt="logo"></RouterLink>
		<RouterLink to="/user-management/user-list">User List</RouterLink>
		<RouterLink to="/user-management/product-list">Product List</RouterLink>
		<RouterLink to="/user-management/calendar">Calendar</RouterLink>
	</div>
</template>

<style scoped>
.side-bar {
	display: flex;
	flex-direction: column;
	width: 10vw;
}
</style>
