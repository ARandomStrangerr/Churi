<script setup>
import UserManagementSideBar from "../components/UserManagementSideBar.vue";
import UserManagementHeader from "../components/UserManagementHeader.vue";
import { RouterView } from "vue-router";
</script>

<template>
	<div class="container">
		<UserManagementSideBar />
		<div class="content">
			<UserManagementHeader />
			<RouterView />
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: row;
	width: 100vw;
	height: 100vh;
}
.content {
	width: 90vw;
	padding: 1em;
}
</style>
