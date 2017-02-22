import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarouselView} from "./views/carousel/carousel.view";

const appRoutes = [
  {path: '/:id', component: CarouselView, name: 'Carousel'},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
