import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './guest/login/login.component';
import { HeaderComponent } from "./header/header.component";
import { UsersComponent } from "./admin/users/users.component";
import { CartViewComponent } from "./cart-view/cart-view.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, LoginComponent, HeaderComponent, UsersComponent, CartViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dummyjson';
}
