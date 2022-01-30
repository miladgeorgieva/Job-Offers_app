import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {NonAuthGuard} from "./guards/non-auth.guard";
import {AuthGuard} from "./guards/auth.guard";

const routes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [NonAuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./offers/offers.module').then(m => m.OffersModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
