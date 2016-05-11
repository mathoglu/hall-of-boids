import {Component, OnInit} from 'angular2/core';
import {CardComponent} from '../../components/card/card';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {CardService} from '../../../common/services/card-service';

@Component({
    selector: 'card-view',
    template: require('./card-view.html'),
    styles: [ require('./card-view.scss') ],
    directives: [CardComponent, ROUTER_DIRECTIVES]
})

export class CardView {

  card: any;
  id: number;
  loading: boolean = true;
  nav: {
    next: boolean;
    prev: boolean;
  };

  constructor(
    private _routeParams: RouteParams,
    private _router: Router,
    private _cardService: CardService
  ){
    this.nav = {
      next: false,
      prev: false
    }
  }

  next(): void {
    this._router.navigate(['Card', {id: this.id+1 }])
  }

  prev(): void {
    this._router.navigate(['Card', {id: this.id-1 }])
  }

  back(): void {
    this._router.navigate(['Overview'])
  }

  ngOnInit(): void {
    let id = this.id = parseInt(this._routeParams.get('id'));
    this._cardService.get(id).then(
      (card)=> {
        this.loading = false;
        this.nav.next = this._cardService.next(this.id);
        this.nav.prev = this._cardService.prev(this.id)
        this.card = card;
      },
      (error)=> {
        this.loading = false;
        console.log(error.message)
      }
    )
  }
}
