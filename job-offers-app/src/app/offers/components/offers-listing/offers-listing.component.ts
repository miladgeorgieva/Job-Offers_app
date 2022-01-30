import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {JobOffer} from "../../models/offer.model";
import {OffersService} from "../../services/offers.service";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-offers-listing',
  templateUrl: './offers-listing.component.html',
  styleUrls: ['./offers-listing.component.scss']
})
export class OffersListingComponent implements OnInit {

  offers: JobOffer[] = [];

  hasPermissions: boolean = false;

  constructor(
    private authService: AuthService,
    private offersService: OffersService
  ) { }

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions('admin');

    this.offersService.getJobOffers().subscribe({
      next: (response: JobOffer[]) => {
        this.offers = response;
      },
      error: (response: HttpErrorResponse) => {
        // console.log(response);
      }
    });
  }

  onDelete(id: number): void {
    this.offersService.deleteOffer(id).subscribe({
      next: () => {
        this.offers = this.offers.filter(offer => offer.id !== id);
      }
    })
  }

}
