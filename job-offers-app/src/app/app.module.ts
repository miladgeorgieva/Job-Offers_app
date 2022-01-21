import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobOffersListingComponent } from './shared/job-offers-listing/job-offers-listing.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from "./angular-material.module";
import {HttpClientModule} from "@angular/common/http";
import {Route, RouterModule} from "@angular/router";

const routes: Route[] = [
  {
    path: 'listing',
    component: JobOffersListingComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: JobOffersListingComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    JobOffersListingComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
