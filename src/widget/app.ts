import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {CardService} from '../common/services/card-service';
import {CarouselView} from './views/carousel/carousel.view';

@Component({
  selector: 'widget-app',
  template: `<div style="margin-left: auto; margin-right: auto;"><router-outlet></router-outlet></div>`,
  directives: [RouterOutlet],
  providers: [CardService]
})

@RouteConfig([
  {path: '/:id', component: CarouselView, name: 'Carousel'}
])

export class WidgetApp {}
