import {Component} from 'angular2/core';
import {CardView} from './views/card/card-view';
import {OverviewView} from './views/overview/overview';
import {RouteConfig, RouterOutlet} from 'angular2/router';


@Component({
  selector: 'app',
  template: `<div class="column small-12"><router-outlet></router-outlet></div>`,
  directives: [RouterOutlet]
})

@RouteConfig([
  {path: '/', component: OverviewView, name: 'Overview'},
  {path: '/card/:id', component: CardView, name: 'Card'}
])

export class App {}
