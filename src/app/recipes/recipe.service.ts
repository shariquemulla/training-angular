import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable ({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  recipeListUpdated = new Subject<Recipe[]>();

  private recipeList : Recipe[] = [
    // new Recipe('Test Pizza', 'This is simply a test description',
    //   'https://torange.biz/photo/38/IMAGE/pizza-health-recipe-38030.jpg',
    //   [
    //     new Ingredient('Cheese', 100),
    //     new Ingredient('Pizza base', 50),
    //     new Ingredient('Pizza Sauce', 150)
    //   ]),
    // new Recipe('Fruit Salad','This is simply a test description 2',
    //   'https://live.staticflickr.com/5737/30622968353_35e06fcb52_b.jpg',
    //   [
    //     new Ingredient('Mango', 200),
    //     new Ingredient('Banana', 50),
    //     new Ingredient('Grapes', 40)
    //   ])
  ]

  getRecipes(){
    return this.recipeList.slice();
  }

  getRecipe(id : number){
    return this.recipeList[id];
  }

  addRecipe(recipe : Recipe){
    this.recipeList.push(recipe);
    this.recipeListUpdated.next(this.recipeList);
  }

  updateRecipe(index : number, recipe : Recipe){
    this.recipeList[index] = recipe;
    this.recipeListUpdated.next(this.recipeList);
  }

  deleteRecipe(index : number){
    this.recipeList.splice(index, 1);
    this.recipeListUpdated.next(this.recipeList);
  }

  setRecipes(recipes : Recipe[]){
    this.recipeList = recipes;
    this.recipeListUpdated.next(this.recipeList.slice());
  }
}
