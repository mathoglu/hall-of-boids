import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {CardService} from '../../../common/services/card-service';

@Component({
    selector: 'card-view',
    template: require('./card-view.html'),
    styles: [ require('./card-view.scss') ]
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
    private _route: ActivatedRoute,
    private _router: Router,
    private _cardService: CardService
  ){
    this.nav = {
      next: false,
      prev: false
    }
  }

  next(): void {
    this._router.navigate(['/card', this.id+1])
  }

  prev(): void {
    this._router.navigate(['/card', this.id-1])
  }

  back(): void {
    this._router.navigate(['/'])
  }

  ngOnInit(): void {
    this._route.params.forEach((params: Params) => {
      let id = this.id = +params['id'];
      this._cardService.get(id).then(
        (card)=> {
          this.loading = false;
          this.nav.next = this._cardService.next(this.id);
          this.nav.prev = this._cardService.prev(this.id);
          this.card = card;
        },
        (error)=> {
          this.loading = false;
          console.log(error.message)
        }
      )
    });
    // let id = this.id = parseInt(this._routeParams.get('id'));
    // this._cardService.get(id).then(
    //   (card)=> {
    //     this.loading = false;
    //     this.nav.next = this._cardService.next(this.id);
    //     this.nav.prev = this._cardService.prev(this.id);
    //     this.card = card;
    //   },
    //   (error)=> {
    //     this.loading = false;
    //     console.log(error.message)
    //   }
    // )
  }
}
