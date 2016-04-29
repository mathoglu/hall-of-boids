import {Component, Input} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
    selector: 'mini-card',
    template: require('./mini-card.html'),
    styles: [require('./mini-card.scss')]
})

export class MiniCardComponent  {
  @Input() data;

  constructor(
    private router:Router){}

  public viewCard(): void {
    this.router.navigate(['Card', { id: this.data.id }] )
  }
}
