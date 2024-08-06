import { defineStore } from "pinia";

export const notifications = defineStore("notification", {
	state() {
		return {
			notificationList: []
		}
	},
	action: {
		addNotification (msg, color) {
			this.notificationList.push({
				message: msg,
				color: color
			});
		},
		removeNotification (index) {
			
		}
	}
})
