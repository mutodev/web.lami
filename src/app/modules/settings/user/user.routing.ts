import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesTypesResolver } from 'app/core/resolvers/types.resolver';
import { UserResolver, UsersResolver } from 'app/core/resolvers/user.resolver';
import { UserDetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { UserListComponent } from './list/list.component';

export const userRoutes: Routes = [
    // { path: '**', component: UserListComponent },
    {
        path: 'all', component: UserListComponent,
        resolve: {
            user: UsersResolver,
            roles: RolesTypesResolver
        }
    },
    {
        path: 'new',
        component: UserDetailComponent,
        resolve: {
            roles: RolesTypesResolver
        }
    },
    {
        path: ':id',
        component: UserDetailComponent,
        resolve: {
            roles: RolesTypesResolver,
            user: UserResolver
        }
    },
    {
        path: ':id',
        component: EditComponent,
        resolve: {
            roles: RolesTypesResolver,
            user: UserResolver
        }
    },


];

