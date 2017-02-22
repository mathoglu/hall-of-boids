import '../lib/polyfill';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {WidgetAppModule} from './widget-app.module';
import '../styles/main.scss';
import '../assets/images/nl-logo.png'

platformBrowserDynamic().bootstrapModule(WidgetAppModule);
