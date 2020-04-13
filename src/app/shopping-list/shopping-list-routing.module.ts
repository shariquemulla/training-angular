import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

const appRoutes : Routes = [
  {path : '', component : ShoppingListComponent, children : [
    {path : 'edit', component : ShoppingEditComponent}
  ]}
]

@NgModule({
  imports : [RouterModule.forChild(appRoutes)],
  exports : [RouterModule]
})
export class ShoppingListRoutingModule{}
