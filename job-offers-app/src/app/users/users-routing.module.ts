import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {AccountComponent} from "./components/account/account.component";
import {UsersComponent} from "./components/users/users.component";

const routes: Route[] = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'account',
        component: AccountComponent,
        // canActivate: [AclGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'account'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class UsersRoutingModule {
}
