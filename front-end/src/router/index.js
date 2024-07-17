import { createRouter, createWebHistory } from 'vue-router'
import SignInScreen from "../views/SignInView.vue"
import SignUpScreen from "../views/SignUpView.vue" 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [	
		{
			path: '/sign-in',
			name: 'SignIn',
			component: SignInScreen
		},
		{
			path: '/sign-up',
			name: 'SignUp',
			component: SignUpScreen
		}
  ]
})

export default router
