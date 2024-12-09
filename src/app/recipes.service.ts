import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private http = inject(HttpClient)

  constructor() { }

  getAllRecipes(limit: number, skip: number): Observable<AllRecipes> {
    return this.http.get<AllRecipes>(`https://dummyjson.com/recipes?limit=${limit}&skipe=${skip}`)
  }
}
export interface AllRecipes {
  recipes: RecipesDetail[]
  total: number,
  skip: number,
  limit: number
}

export interface RecipesDetail {
    id: number,
    name: string,
    ingredients: string[],
    instructions: string[],
    prepTimeMinutes: number,
    cookTimeMinutes: number,
    servings: number,
    difficulty: string,
    cuisine: string,
    caloriesPerServing: number,
    tags: string[],
    userId: number,
    image: string,
    rating: number,
    reviewCount: number,
    mealType: string[]
  
}
