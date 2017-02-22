import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewView } from './views/overview/overview';
import { CardView } from './views/card/card-view';

const appRoutes = [
  {path: '', component: OverviewView, name: 'Overview'},
  {path: 'card/:id', component: CardView, name: 'Card'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
