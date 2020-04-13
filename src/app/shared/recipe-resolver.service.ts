import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { RecipesComponent } from '../recipes/recipes.component';

@Injectable({
  providedIn : 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

  constructor(private dataService : DataStorageService,
              private recipeService : RecipeService){}

  resolve(activatedRoute : ActivatedRouteSnapshot,
          state : RouterStateSnapshot){
      const recipes = this.recipeService.getRecipes();
      if(recipes.length === 0){
        return this.dataService.fetchRecipes();
      }else {
        return recipes;
      }
  }
}
