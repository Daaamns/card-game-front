import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appClassBackground]',
})
export class ClassBackgroundDirective implements OnChanges {
  @Input('appClassBackground') className!: string;

  private classImages: { [key: string]: string } = {
    Mage: '../../../assets/pngegg.png',
    Warrior: '../../../assets/warrior.png',
    // Ajoutez d'autres types de classes et leurs images respectives ici
  };

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.setClassBackground();
  }

  private setClassBackground() {
    const imageUrl = this.classImages[this.className] || '';
    this.el.nativeElement.style.backgroundImage = `url(${imageUrl})`;
    this.el.nativeElement.style.backgroundSize = 'contain';
    this.el.nativeElement.style.backgroundPosition = 'center';
  }
}
