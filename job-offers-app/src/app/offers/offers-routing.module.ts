import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {OfferCreateComponent} from "./components/offer-create/offer-create.component";
import {OffersListingComponent} from "./components/offers-listing/offers-listing.component";
import {OffersComponent} from "./components/offers/offers.component";
import {AclGuard} from "../guards/acl.guard";
import {OfferViewComponent} from "./components/offer-view/offer-view.component";
import {MyCandidaciesComponent} from "./components/my-candidacies/my-candidacies.component";

const routes: Route[] = [
  {
    path: '',
    component: OffersComponent,
    children: [
      {
        path: 'listing',
        component: OffersListingComponent
      },
      {
        path: 'listing/new',
        component: OfferCreateComponent
      },
      {
        path: 'listing/edit',
        component: OfferCreateComponent,
        canActivate: [AclGuard]
      },
      {
        path: 'listing/edit/:id',
        component: OfferCreateComponent,
        canActivate: [AclGuard]
      },
      {
        path: 'listing/view',
        component: OfferViewComponent,
        // canActivate: [AclGuard]
      },
      {
        path: 'listing/view/:id',
        component: OfferViewComponent,
        // canActivate: [AclGuard]
      },
      {
        path: 'my-candidacies',
        component: MyCandidaciesComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listing'
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

export class OffersRoutingModule {
}
