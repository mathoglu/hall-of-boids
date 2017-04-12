import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { routing } from './widget-app.routing';

import { WidgetApp }  from './app';
import {SkillComponent} from "../app/components/skill/skill";
import {WidgetCardComponent} from "./components/widget-card/widget-card";
import {CarouselView} from "./views/carousel/carousel.view";
import { ComponentsModule } from "../app/components/components.module";



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    routing
  ],
  declarations: [
    WidgetApp,
    WidgetCardComponent,
    CarouselView
  ],
  providers: [

  ],
  bootstrap: [ WidgetApp ]
})

export class WidgetAppModule { }
