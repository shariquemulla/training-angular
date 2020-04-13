import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe : Recipe;
  index : number;

  constructor(private shoppingListService : ShoppingListService,
              private recipeService : RecipeService,
              private activatedRoute : ActivatedRoute,
              private router : Router
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (param : Params) => {
        this.index = +param['id'];
        this.recipe = this.recipeService.getRecipe(+param['id']);
      }
    )
  }

  toShoppingList(){
    this.shoppingListService.addIngredient(this.recipe.ingredients);
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['../'], {relativeTo : this.activatedRoute})
  }

}
