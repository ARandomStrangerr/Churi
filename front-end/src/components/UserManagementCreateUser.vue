<script setup>
import AddIcon from "./icons/Add.vue";
</script>

<template>
<form @submit.prevent="submit">
	<div class="banner">
		<h1>Create User</h1>
		<button class="button green" @submit.prevent="submit"><AddIcon />Save</button>
	</div>
	<div>
		<h2>Sign-in Information</h2>
		<div class="flex-row">
			<div>
				<label for="username">Username</label>
				<input type="text" id="username">
			</div>
			<div>
				<label for="password">Password</label>
				<input type="password" id="password">
			</div>
		</div>
	</div>
	<div>
		<h2>Role</h2>
		<select name="User Role" id="">
			<option value="">Customer</option>
			<option value="">Employee</option>
			<option value="">Admin</option>
			<option value="">Vendor</option>
		</select>
	</div>
	<div>
		
	</div>
</form>
</template>
