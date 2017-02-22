import {Component} from '@angular/core';
import {CardService} from '../common/services/card-service';
import {CarouselView} from './views/carousel/carousel.view';

@Component({
  selector: 'widget-app',
  template: `<div style="margin-left: auto; margin-right: auto;"><router-outlet></router-outlet></div>`,
  providers: [CardService]
})
export class WidgetApp {}
