import {Component, OnInit, Input} from 'angular2/core';
import {WidgetCardComponent} from '../../components/widget-card/widget-card';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {CardService} from '../../../common/services/card-service';

@Component({
    selector: 'carousel-view',
    template: require('./carousel.view.html'),
    styles: [ require('./carousel.view.scss') ],
    directives: [WidgetCardComponent, ROUTER_DIRECTIVES]
})

export class CarouselView implements OnInit {

  loading: boolean = true;
  currentCard: any;

  constructor(
    private _cardService: CardService,
    private _routeParams: RouteParams,
    private _router: Router
  ){}

  private _initTimeout(id): void {
    setTimeout(()=> {
      this._router.navigate(['Carousel', { id: id+1 }])
    }, 3*1000)
  }

  ngOnInit(): void {
    let id = parseInt(this._routeParams.get('id'));
    this._cardService.get(id).then(
      (card)=> {
        if(!card) {
          this._router.navigate(['Carousel', { id: 1 }])
          return;
        }
        this.loading = false;
        this.currentCard = card;
        this._initTimeout(id);
      }
    )
  }

  ngOnDestroy(): void {

  }
}
