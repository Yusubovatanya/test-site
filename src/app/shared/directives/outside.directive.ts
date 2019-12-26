import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[ngxOutside]',
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class OutsideDirective {
  @Output() clickedOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  onClick(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.clickedOutside.emit();
    }
  }
}
