import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from "rxjs/operators";

@Injectable({
  providedIn :'root'
})
export class DataStorageService{
  private url = 'https://recipe-book-42a66.firebaseio.com/recipe.json';

  constructor(private http : HttpClient,
              private recipeService : RecipeService){}

  storeRecipes(){
    let recipes : Recipe[] = this.recipeService.getRecipes();
    this.http.put(this.url, recipes).subscribe(
      response => {
        console.log(response)
      }
    )
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>(this.url)
      .pipe(
        map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients : recipe.ingredients ? recipe.ingredients : []
          }
        })
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    )
  }

}
