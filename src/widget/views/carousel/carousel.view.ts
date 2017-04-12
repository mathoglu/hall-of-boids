import {Component, OnInit, Input} from '@angular/core';
import {WidgetCardComponent} from '../../components/widget-card/widget-card';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CardService} from '../../../common/services/card-service';

@Component({
    selector: 'carousel-view',
    template: require('./carousel.view.html'),
    styles: [ require('./carousel.view.scss') ]
})

export class CarouselView implements OnInit {

  loading: boolean = true;
  currentCard: any;
  speed: number;

  constructor(
    private _cardService: CardService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  private _initTimeout(id): void {
    setTimeout(()=> {
      let nextId = this._cardService.getNextCardId(id);
      this._router.navigate(['Carousel', { id: nextId, speed: this.speed }])
    }, this.speed*1000)
  }

  ngOnInit(): void {
    this._route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.speed = +params['speed'] || 30;
      this._cardService._fetchIds().then((ids) => {
        this._cardService.get(id).then(
          (card)=> {
            if(!card) {
              this._router.navigate(['Carousel', { id: 1, speed: this.speed }])
              return;
            }
            this.loading = false;
            this.currentCard = card;
            this._initTimeout(id);
          }
        )
      })
    });
  }

  ngOnDestroy(): void {

  }
}
