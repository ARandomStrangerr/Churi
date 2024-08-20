import { createRouter, createWebHistory } from 'vue-router'
import StoreHeaderAndFooterView from "../views/Store.vue"
import HomePageComponent from "../components/StoreHomePage.vue"
import SignInScreen from "../views/SignInView.vue"
import SignUpScreen from "../views/SignUpView.vue"
import UserManagementScreen from "../views/UserManagementView.vue";
import UserListComponent from "../components/UserManagementUserList.vue";
import ProductListComponent from "../components/UserManagementProductList.vue";
import CreateOrEditProductComponenet from "../components/UserManagementCreateOrEditProduct.vue";
import CreateUserComponent from "../components/UserManagementCreateUser.vue";
import ConfirmationDialogeComponent from "../components/ConfirmationDialog.vue";
import SingleItemComponent from "../components/StoreIndividulaProduct.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: StoreHeaderAndFooterView,
			children: [
				{
					path: "/",
					name: 'HomePage',
					component: HomePageComponent
				},
				{
					path: '/sign-in',
					name: "SignIn",
					component: SignInScreen
				},
				{
					path: "/product/:id",
					name: "SingleItemDisplay",
					component: SingleItemComponent
				}
			]
		},
		{
			path: '/user-management',
			component: UserManagementScreen,
			children:[
				{
					path: '/user-management/user-list',
					name: 'UserList',
					component: UserListComponent,
					children: [
						{
							path: '/user-management/user-list/update-user/:id',
							name: "ChangeRoleConfirmation",
							component: ConfirmationDialogeComponent
						},
						{
							path: '/user-management/user-list/delete-user/:id',
							name: "DeleteUser",
							component: ConfirmationDialogeComponent
						}
					]
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
					component: ProductListComponent,
					children: [
						{
							path: '/user-management/product-list/delete-product/:id',
							name: "RemoveProductConfirmation",
							component: ConfirmationDialogeComponent
						},
						{
							path: '/user-management/product-list/change-publication-status/:id',
							name: "ChanePublicationStatus",
							component: ConfirmationDialogeComponent
						}

					]
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
