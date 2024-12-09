import { Component, inject, OnInit } from '@angular/core';
import {RecipesDetail, RecipesService } from '../recipes.service';
import { RecipeCardComponent } from "../recipe-card/recipe-card.component";

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {
private recipeApi=inject(RecipesService)
recipes?:RecipesDetail[]
limit=2

ngOnInit(): void {
  this.recipeApi.getAllRecipes(2,0).subscribe((item)=>{
    console.log(item)
    this.recipes=item.recipes
   this.limit=item.limit
  })
}
}
