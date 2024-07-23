import { createRouter, createWebHistory } from 'vue-router'
import HomeScreen from "../views/HomePage.vue"
import SignInScreen from "../views/SignInView.vue"
import SignUpScreen from "../views/SignUpView.vue"
import UserListScreen from "../views/UserManagementView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: HomeScreen,
			children: [
				{
					path: '/sign-in',
					name: 'SignIn',
					component: SignInScreen
				},
				{
					path: '/sign-up',
					name: 'SignUp',
					component: SignUpScreen
				},
			]
		},
		{
			path: '/user-management',
			component: UserListScreen,
      children: []
		}
  ]
})

export default router
