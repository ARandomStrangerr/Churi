import { defineStore } from "pinia";

export const signInState = defineStore("signInState", {
	state: () => {
		return {
			isSignedIn: false
		}
	},
	actions: {
		signIn() {
      this.isSignedIn = true;
		},
		signOut() {
      this.isSignedIn = false;
		}
	}
})
