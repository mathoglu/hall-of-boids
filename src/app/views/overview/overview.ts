import {Component, Input, OnInit} from 'angular2/core';
import {MiniCardComponent} from '../../components/mini-card/mini-card';
import {CardService} from '../../services/card-service';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'overview-view',
    template: require('./overview.html'),
    //styles: [require('./overview.scss')],
    directives: [MiniCardComponent, ROUTER_DIRECTIVES],
    providers: [CardService]
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
