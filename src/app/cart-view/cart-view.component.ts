import { Component, inject, OnInit } from '@angular/core';
import { CartHolderService } from '../cart-holder.service';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss'
})
export class CartViewComponent implements OnInit {
 public cartHolder = inject(CartHolderService)
  ngOnInit(): void {

  }
}
