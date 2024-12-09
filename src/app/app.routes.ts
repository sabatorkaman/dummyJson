import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './guest/login/login.component';
import { hasAdminRole, isAnonymous, isAuthenticated } from './auth.guard';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { UsersComponent } from './admin/users2/users2.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { ProductsComponent } from './products/products.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TodosComponent } from './todos/todos.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { RecipesComponent } from './recipes/recipes.component';

export const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
        canActivate: [isAuthenticated],

    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [isAnonymous]
    }
    ,
    {
        path: "admin/users",
        component: UsersComponent,
        canActivate: [isAuthenticated, hasAdminRole],
    },
    {
        path: "add-user",
        component: AddUserComponent
        // loadComponent:()=>import('./admin/add-user/add-user.component').then((mod)=> mod.AddUserComponent)
    },

    {
        path: "edit-user/:id",
        component: EditUserComponent
    },
    {
        path: "post",
        component: PostsComponent
    }, {
        path: "post/:id",
        component: PostDetailComponent
    },
    {
        path: "products",
        component: ProductsComponent
    },
    {
        path: "cart",
        component: CartViewComponent
    }, {
        path: "products/:id",
        component: ProductDetailComponent
    },
    {
        path: "todos",
        component: TodosComponent,
        canActivate: [isAuthenticated, hasAdminRole],

    },
    {
        path: "add-todo",
        component: TodoAddComponent,
        canActivate: [isAuthenticated, hasAdminRole],

    },
    {
        path: "edit-todos",
        component: TodoEditComponent,
        canActivate: [isAuthenticated, hasAdminRole],

    },
    {
        path: "recipes",
        component: RecipesComponent
    }


];
