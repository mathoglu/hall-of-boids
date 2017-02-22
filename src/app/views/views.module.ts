import { NgModule } from '@angular/core';

import { ComponentsModule } from '../components/components.module';
import { CardView } from './card/card-view';
import { OverviewView } from './overview/overview';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    BrowserModule,
    ComponentsModule
  ],
  declarations: [
    CardView,
    OverviewView
  ],
  providers: [

  ],
  bootstrap: [  ]
})

export class ViewsModule { }
