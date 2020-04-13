import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Form, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { of } from 'rxjs';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : number;
  editMode : boolean = false;
  recipeForm : FormGroup;

  constructor(private activatedRoute : ActivatedRoute,
              private recipeService : RecipeService,
              private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (param : Params) => {
        this.id = param['id'];
        this.editMode = param['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm(){
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([], Validators.required);

    if(this.editMode){
      let recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe.ingredients.length > 0){
        recipe.ingredients.forEach(element => {
          ingredients.push(new FormGroup({
            'name' : new FormControl(element.name, Validators.required),
            'amount' : new FormControl(element.amount, [Validators.required, this.validateAmount])
          }))
        });
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(imagePath, Validators.required),
      'description' : new FormControl(description, Validators.required),
      'ingredients' : ingredients
    })
  }

  onSubmit(){
    // const recipe = new Recipe(
    //   this.recipeForm.value('name'),
    //   this.recipeForm.value('description'),
    //   this.recipeForm.get('imagePath').value, // another way
    //   this.recipeForm.get('ingredients').value
    // )
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo : this.activatedRoute});
    this.onCancel();
  }

  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [Validators.required, this.validateAmount])
      })
    )
  }

  deleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  validateAmount(control : FormControl) : {[s : string] : boolean}{
    if(control.value <= 0){
      return {'invalidAmount' : true}
    }else{
      return null;
    }
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo : this.activatedRoute});
  }
}
