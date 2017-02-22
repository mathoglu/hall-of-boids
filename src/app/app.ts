import {Component} from '@angular/core';
import {CardService} from '../common/services/card-service';

@Component({
  selector: 'app',
  template: `<div class="column small-12"><router-outlet></router-outlet></div>`,
  providers: [CardService]
})
export class AppComponent {}
