import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {OffersListingComponent} from "./components/offers-listing/offers-listing.component";
import {OfferItemComponent} from "./components/offer-item/offer-item.component";
import {OfferCreateComponent} from "./components/offer-create/offer-create.component";
import { OffersComponent } from './components/offers/offers.component';
import {OffersRoutingModule} from "./offers-routing.module";
import {AngularMaterialModule} from "../angular-material.module";
import {OfferViewComponent} from "./components/offer-view/offer-view.component";
import { MyCandidaciesComponent } from './components/my-candidacies/my-candidacies.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OffersRoutingModule,
    AngularMaterialModule
  ],
  declarations: [
    OffersListingComponent,
    OfferItemComponent,
    OfferCreateComponent,
    OfferViewComponent,
    OffersComponent,
    MyCandidaciesComponent
  ]
})

export class OffersModule {
}
