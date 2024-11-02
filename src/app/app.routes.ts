import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './guest/login/login.component';
import { hasAdminRole, isAnonymous, isAuthenticated } from './auth.guard';
import { UsersComponent } from './users2/users2.component';
import { AddUserComponent } from './admin/add-user/add-user.component';

export const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
        canActivate: [isAuthenticated]
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
        path:"add-user",
        component:AddUserComponent
    }
];
