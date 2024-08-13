import { defineStore } from "pinia";

export const notification = defineStore("notification", {
	state() {
		return {
			notificationList: []
		}
	},
	actions: {
		 /**
		 *
		 * @param {String} msg: the message to display
		 * @param {String} color: the color or the notification
		 */
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
