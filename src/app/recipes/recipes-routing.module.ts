import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverService } from '../shared/recipe-resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const appRoutes : Routes = [
  {path : '', component : RecipesComponent,
    canActivate : [AuthGuard],
    children :[
    {path : '', component : RecipeStartComponent},
    {path : 'new', component : RecipeEditComponent},
    {path : ':id/edit', component : RecipeEditComponent, resolve : [RecipeResolverService]},
    {path : ':id', component : RecipeDetailComponent, resolve : [RecipeResolverService]}
  ]},
]

@NgModule({
  imports : [
    RouterModule.forChild(appRoutes)
  ],
  exports : [RouterModule]
})
export class RecipesRoutingModule{}
