import { NgModule } from '@angular/core';

import { CardComponent } from './card/card';
import { MiniCardComponent } from './mini-card/mini-card';
import { SkillComponent } from './skill/skill';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    CardComponent,
    MiniCardComponent,
    SkillComponent
  ],
  providers: [

  ],
  bootstrap: [  ],
  exports: [ CardComponent, MiniCardComponent, SkillComponent ]
})
export class ComponentsModule { }
