import { Component, Input, OnInit } from '@angular/core';
import { ProductsDetail } from '../product-api.service';
import { MatIcon } from '@angular/material/icon';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [MatIcon, NgStyle],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements OnInit {
[x: string]: any;
  @Input() rating?: number
  allRating = [1,2,3,4,5]
  ngOnInit(): void {

  }

}
