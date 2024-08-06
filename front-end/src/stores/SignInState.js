import { defineStore } from "pinia";
import { inject } from "vue";
import Axios from "axios";

export const signInState = defineStore("signInState", {
	state() {
		return {}
	},
	actions: {
		async isSignedIn() {
			const API_ADDR = inject("expressAddress");
			return (await Axios.get(`${API_ADDR}/auth/is-sign-in`)).data;
		}
	}
});
