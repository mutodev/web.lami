import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PqrListComponent } from './list/list.component';
import { PqrDetailComponent } from './detail/detail.component';

export const pqrRoutes: Routes = [
    {
        path: 'all', component: PqrListComponent,
    },
    { path: 'new', component: PqrDetailComponent },
    { path: ':id', component: PqrDetailComponent},


];
