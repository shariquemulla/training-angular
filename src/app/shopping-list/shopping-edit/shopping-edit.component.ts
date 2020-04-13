import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  editSubscription : Subscription;
  @ViewChild('f') form : NgForm;
  editMode : boolean = false;
  ingredientIndex : number;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
    this.editSubscription = this.shoppingListService.ingredientSelected.subscribe(
      (index : number) => {
        this.editMode = true;
        this.ingredientIndex = index;
        const ingredient = this.shoppingListService.getIngredientByIndex(index);
        this.form.setValue({
          'name' : ingredient.name,
          'amount' : ingredient.amount
        })
      }
    )
  }

  onSubmit(formInput : NgForm){
    if(this.editMode){
      this.shoppingListService.updateIngredient(
        this.ingredientIndex,
        new Ingredient(formInput.value.name, formInput.value.amount)
     );
    }else{
      this.shoppingListService.addIngredient([
        new Ingredient(formInput.value.name, formInput.value.amount)
     ]);
    }
  }

  ngOnDestroy(){
    this.editSubscription.unsubscribe();
  }

  clearForm(){
    this.form.reset();
    this.editMode = false;
  }

  onDeleteIngredient(){
    this.shoppingListService.removeIngredientFromList(this.ingredientIndex);
    this.clearForm();
  }
}
