<script setup>
import Subscription from "../subscription/Subscription.js"
import { notification } from "../stores/Notification.js"
</script>

<template>
	<div class="container">
		<div v-for="(item, index) of notification().notificationList" :key="index" :class="{'notification': true, 'green': item.color==='green', 'red': item.color==='red', 'yellow': item.color==='yellow'}" v-on:click="notification().removeNotification(index)">
			{{ item.message }}
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			notifications: []
		}
	},
	mounted(){
		Subscription.subscribe("notification", (args) => {
			this.notifications.push({color: args[1], msg: args[2]});
		})
	}
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	position: absolute;
	top:0px;
	right: 0px;
	z-index: 9;
}
.red {
	background-color: #fde2e4;
	border-color: #fad2e1;
}
.green {
	background-color: #e2ece9;
	border-color: #bee1e6;
}
.yellow {
	background-color: #fdf3d9;
	border-color: #fbecc1;
}
.notification {
	width: 20em;
	padding: 1em;
	border-width: 0px 0px 0px 4px;
	border-style: solid;
	margin-top: 0.5em;
}
</style>
