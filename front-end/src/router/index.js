import { createRouter, createWebHistory } from 'vue-router'
import HomeScreen from "../views/HomePage.vue"
import SignInScreen from "../views/SignInView.vue"
import SignUpScreen from "../views/SignUpView.vue"
import UserManagementScreen from "../views/UserManagementView.vue";
import UserListComponent from "../components/UserManagementUserList.vue";
import ProductListComponent from "../components/UserManagementProductList.vue";
import CreateOrEditProductComponenet from "../components/UserManagementCreateOrEditProduct.vue";
import CreateUserComponent from "../components/UserManagementCreateUser.vue"

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
					path: '/user-management/create-user',
					name: 'CreateUser',
					component: CreateUserComponent
				},
				{
					path: '/user-management/edit-user/:id',
					name: 'EditUser',
				},
				{
					path: '/user-management/product-list',
					name: "ProductList",
					component: ProductListComponent
				},
				{
					path: '/user-management/create-product',
					name: "CreateProduct",
					component: CreateOrEditProductComponenet
				},
				{
					path: '/user-management/edit-product/:id',
					name: "EditProduct",
					component: CreateOrEditProductComponenet
				}
			]
		}
	]
})

export default router
