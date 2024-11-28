import { Component, Input } from '@angular/core';
import { ProductsDetail } from '../product-api.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
@Input() product ?:ProductsDetail
}
