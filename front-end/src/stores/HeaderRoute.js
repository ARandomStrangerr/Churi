import { defineStore } from "pinia";

export const headerRoute = defineStore("headerRoute", {
	state() {
		return {
			_home: {
				tokken: ["User Management"]
			},
			thisRoute: "home"
		}
	},
	actions: {
		setRoute(routeName) {
			thisRoute = routeName;
		},
		getRoute() {
			switch (this.thisRoute){
				case "home": return this._home;
			}
		}
	}
});
