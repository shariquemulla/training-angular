import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations : [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective
  ],
  imports : [CommonModule],
  exports : [
    CommonModule,
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective
  ]
})
export class SharedModule{}
