import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientSelected = new Subject<number>();

  constructor() { }

  private ingredients : Ingredient[] = [
    new Ingredient('Apples', 50),
    new Ingredient('Tomatoes', 45)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredientsToAdd : Ingredient[]){
    this.ingredients.push(...ingredientsToAdd);
    this.ingredientsChanged.next(this.ingredients);
  }

  getIngredientByIndex(index : number){
    return this.ingredients[index];
  }

  updateIngredient(index : number, updatedIngredient : Ingredient){
    this.ingredients[index] = updatedIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  removeIngredientFromList(index : number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
