<script setup>
import TagInputComponent from "./TagInput.vue";
import Veil from "./Veil.vue";
import { RouterLink } from "vue-router";
import { notification } from "../stores/Notification.js";
import Axios from "axios";
</script>

<template>
<Veil>
	<form @submit.prevent="submit">
		<h1>Create Event</h1>
		<div>
			<h2><label for="event-name">Event Name</label></h2>
			<input type="text" v-model="name">
		</div>
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
		<div>
			<h2><label for="location">Location</label></h2>
			<input type="text" v-model="location">
		</div>
		<div>
			<h2><label for="participant">Paticipant</label></h2>
		 	<TagInputComponent />	
		</div>
		<div class="button-wrapper">
			<div class="button red" v-if="eventId">Delete</div>
			<div class="button yellow" @click="this.$router.push('/user-management/calendar')">Cancel</div>
			<div class="button green">Create Event</div>
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
	},
	mounted() {
		Axios.get(`${this.expressAddress}/user-management/get-employee-list`
		).then((data) => {
			console.log(data);
		}).catch((data) => {
			console.log(data);
		});
	}
}
</script>

<style scoped>
form {
	background-color: white;
	border-radius: 10px;
	padding: 5em;
}
form > div {
	margin-top: 1em;
}
.date {
	display: grid;
	grid-template-columns: 1fr 1fr;
}
input {
	width: 100%;
}
.button-wrapper {
	display: flex;
	flex-direction: row;
}
.button {
	border-radius: 4px;
	flex-grow: 1;
	flex-basis: 0;
	margin-right: 1em;
}
.button:last-child{
	margin-right: 0em;
}
</style>
