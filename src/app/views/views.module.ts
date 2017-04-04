import { NgModule } from '@angular/core';

import { ComponentsModule } from '../components/components.module';
import { CardView } from './card/card-view';
import { OverviewView } from './overview/overview';
import { BrowserModule } from "@angular/platform-browser";
import { EditView } from "./edit/edit";
import { CardDataService } from "../../common/services/card-data-service";
import { EditEmployeeView } from "./edit-employee/edit-employee";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";

@NgModule({
  imports: [
    BrowserModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    CardView,
    OverviewView,
    EditView,
    EditEmployeeView
  ],
  providers: [
    CardDataService
  ],
  bootstrap: [  ]
})

export class ViewsModule { }
