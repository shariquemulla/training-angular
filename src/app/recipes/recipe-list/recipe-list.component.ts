import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipeList : Recipe[];
  recipeSubscription : Subscription;

  constructor(private recipeService : RecipeService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeSubscription = this.recipeService.recipeListUpdated.subscribe((recipes : Recipe[]) => {
        this.recipeList = recipes;
      }
    )
    this.recipeList = this.recipeService.getRecipes();
  }

  newRecipe(){
    this.router.navigate(['new'], {relativeTo : this.activatedRoute})
  }

  ngOnDestroy(){
    this.recipeSubscription.unsubscribe();
  }
}
