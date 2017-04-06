import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewView } from './views/overview/overview';
import { CardView } from './views/card/card-view';
import {EditView} from "./views/edit/edit";
import {EditEmployeeView} from "./views/edit-employee/edit-employee";

const appRoutes = [
  {path: '', component: OverviewView, name: 'Overview'},
  {path: 'card/:id', component: CardView, name: 'Card'},
  {path: 'edit', component: EditView, name: 'Edit'},
  {path: 'employee/new', component: EditEmployeeView, name: 'AddEmployee'},
  {path: 'employee/:id', component: EditEmployeeView, name: 'EditEmployee'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
