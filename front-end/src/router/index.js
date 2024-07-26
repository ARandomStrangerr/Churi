import { createRouter, createWebHistory } from 'vue-router'
import HomeScreen from "../views/HomePage.vue"
import SignInScreen from "../views/SignInView.vue"
import SignUpScreen from "../views/SignUpView.vue"
import UserManagementScreen from "../views/UserManagementView.vue";
import UserListComponent from "../components/UserManagementUserList.vue";
import ProductListComponent from "../components/UserManamentProductList.vue"

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
			component: UserManagementScreen,
			children:[
				{
					path: '/user-management/user-list',
					name: 'UserList',
					component: UserListComponent
				},
				{
					path: '/user-management/product-list',
					name: "ProductList",
					component: ProductListComponent
				}
			]
		}
	]
})

export default router
