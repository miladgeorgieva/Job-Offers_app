import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AngularMaterialModule} from "../angular-material.module";
import {AccountComponent} from "./components/account/account.component";
import {UsersRoutingModule} from "./users-routing.module";
import { UsersComponent } from './components/users/users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsersRoutingModule,
    AngularMaterialModule
  ],
  declarations: [
    AccountComponent,
    UsersComponent
  ]
})

export class UsersModule {
}
