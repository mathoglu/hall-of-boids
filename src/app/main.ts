import '../lib/polyfill';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
import '../styles/main.scss';
import '../assets/images/nl-logo.png'

if (!global.Intl) {
  require('intl');
  require('intl/locale-data/jsonp/en.js');
}

platformBrowserDynamic().bootstrapModule(AppModule);
