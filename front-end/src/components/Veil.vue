<script setup>
	defineProps({
		component: {
			type: Object,
			requied: true
		}
	})
</script>

<template>
	<div class="veil">
		<slot :component='component' />
	</div>
</template>

<style scoped>
.veil{
	background-color: #e9ecefb0;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
