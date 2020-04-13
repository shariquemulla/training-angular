import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') dropdownOpen = false;

  // constructor() { }

  // @HostListener('click') onClick(event : Event){
  //   this.dropdownOpen = !this.dropdownOpen;
  // }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.dropdownOpen = this.elRef.nativeElement.contains(event.target) ? !this.dropdownOpen : false;
  }
  constructor(private elRef: ElementRef) {}

}
