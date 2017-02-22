import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../../common/services/card-service';

@Component({
    selector: 'overview-view',
    template: require('./overview.html'),
    //styles: [require('./overview.scss')],
})
export class OverviewView {
  @Input() content;
  cards: any[];
  loading: boolean = true;

  constructor(private _cardService: CardService){}

  ngOnInit() {
    this._cardService.list().then(
      (cards)=> {
        this.loading = false;
        this.cards = cards;
      }
    )
  }
}
