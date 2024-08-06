import { defineStore } from "pinia";

export const notification = defineStore("notification", {
	state() {
		return {
			notificationList: []
		}
	},
	actions: {
		addNotification (msg, color) {
			this.notificationList.push({
				message: msg,
				color: color
			});
		},
		removeNotification (index) {
			this.notificationList.splice(index,1);
		}
	}
});
