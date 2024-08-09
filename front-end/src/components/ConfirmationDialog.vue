<script setup>
import Veil from "./Veil.vue"
import { defineProps } from "vue"

const PROP = defineProps({
	message: String
});
</script>

<template>
	<Veil>
		<div class="container">
			<div class="upper-pannel">{{message}}</div>
			<div class="lower-pannel">
				<div class="button green" v-on:click="onConfirm">Confirm</div>
				<div class="button red" v-on:click="onReject">Reject</div>
			</div>
		</div>
	</Veil>
</template>

<script>
export default {
	methods: {
		onConfirm() {
			this.$emit("confirm");
		},
		onReject(){
			this.$emit("decline");
		}
	}
}
</script>

<style scoped>
.container {
	box-shadow: 10px 5px 5px #adb5bd;
}
.upper-pannel {
	background-color: white;
	padding: 2em;
	width: 500px;
}
.lower-pannel {
	background-color: #f8f9fa;
	display: flex;
	flex-direction: row;
	justify-content: right;
	width: 500px;
	padding: 2em;
}
.button {
	margin-left: 1em;
}
</style>
