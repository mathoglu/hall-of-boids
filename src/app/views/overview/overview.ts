import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../../common/services/card-service';
import {Router} from "@angular/router";

@Component({
    selector: 'overview-view',
    template: require('./overview.html'),
    //styles: [require('./edit-employee.scss')],
})
export class OverviewView {
  @Input() content;
  cards: any[];
  loading: boolean = true;

  constructor(
    private _cardService: CardService,
    private _router: Router
  ){}

  ngOnInit() {
    this._cardService.list().then(
      (cards)=> {
        this.loading = false;
        this.cards = cards;
      }
    )
  }

  viewEdit() {
    this._router.navigate(['/edit']);
  }
}
