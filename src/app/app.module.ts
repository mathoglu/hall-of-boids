import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { ViewsModule } from './views/views.module';
import { routing } from './app.routing';

import { AppComponent }  from './app';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ViewsModule,
    routing
  ],
  declarations: [
    AppComponent
  ],
  providers: [

  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
