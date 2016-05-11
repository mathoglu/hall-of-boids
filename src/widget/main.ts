import {bootstrap}    from 'angular2/platform/browser';
import {WidgetApp} from './app';
import {ROUTER_PROVIDERS} from 'angular2/router';
import { HTTP_PROVIDERS } from "angular2/http";
import '../styles/main.scss';
import '../assets/images/EPS_RGB_WHITE_10.png'

bootstrap(WidgetApp, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);
