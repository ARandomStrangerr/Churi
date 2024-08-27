<script setup>
import Veil from "./Veil.vue";
import { RouterLink } from "vue-router";
import { notification } from "../stores/Notification.js";
import Axios from "axios";
</script>

<template>
<Veil>
	<form @submit.prevent="submit">
		<h1>Create Event</h1>
		<h2><label for="event-name">Event Name</label></h2>
		<input type="text" v-model="name">
		<h2>Time and Date</h2>
		<div class="date">
			<div>
				<h3><label for="date-time-begin">Begin</label></h3>
				<input type="datetime-local" v-model="startTime">
			</div>
			<div>
				<h3><label for="date-time-end">End</label></h3>
				<input type="datetime-local" v-model="endTime">
			</div>
		</div>
		<h2><label for="location">Location</label></h2>
		<input type="text" v-model="location">
		<h2><label for="participant">Paticipant</label></h2>
		<input type="text" v-model="participant">
		<div>
			<div class="button red" v-if="eventId">Delete</div>
			<RouterLink to="/user-management/calendar"><div class="button yellow">Cancel</div></RouterLink>
			<button class="button green">Create Event</button>
		</div>
	</form>
</Veil>
</template>

<script>
export default {
	inject: [ "expressAddress" ],
	data() {
		return {
			eventId: null,
			name: "",
			startTime: "",
			endTime: "",
			participant: "",
			location: ""
		}
	},
	methods: {
		submit() {
			Axios.post(`${this.expressAddress}/user-management/create-event/`, {
				name: this.name,
				start: this.startTime,
				end: this.endTime,
				location: this.location,
				participant: this.participant
			}).then((data) => {
				notification().addNotification(data.data, "green");
			}).catch((data) => {
				console.log(data);
			});
		}
	}
}
</script>

<style scoped>
form {
	background-color: white;
	border-radius: 10px;
	padding: 5em;
}
.date {
	display: grid;
	grid-template-columns: 1fr 1fr;
}
input {
	width: 100%;
}
.button {
	border-radius: 4px;
}
</style>
