import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {JobOffer} from "../../models/offer.model";
import {OffersService} from "../../services/offers.service";
import {AuthService} from "../../../auth/services/auth.service";
import {JobLike} from "../../models/job-like.model";

@Component({
  selector: 'app-offers-listing',
  templateUrl: './offers-listing.component.html',
  styleUrls: ['./offers-listing.component.scss']
})
export class OffersListingComponent implements OnInit {

  offers: JobOffer[] = [];

  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private offersService: OffersService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.hasPermissions('admin');

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

  onLikeDislike(offer: JobOffer): void {
    let jobLikeId = offer.jobLikes?.filter(o => o.userId === this.authService.getLoggedUserFromLocalStorage()?.id);
    if (jobLikeId) {
      if (jobLikeId?.length > 0) {
        this.offersService.dislike(jobLikeId[0].id).subscribe({
          next: () => {
            const foundIndex = this.offers.findIndex(o => o.id === offer.id);
            offer.jobLikes = offer.jobLikes?.filter(l => l.id !== jobLikeId![0].id);
            this.offers[foundIndex] = offer;
          }
        })

      } else {
        const jobLike = {
          userId: this.authService.getLoggedUserFromLocalStorage()?.id,
          jobOfferId: offer.id
        } as JobLike;
        this.offersService.like(jobLike).subscribe({
          next: (jobLike) => {
            const foundIndex = this.offers.findIndex(o => o.id === offer.id);
            offer.jobLikes?.push(jobLike);
            this.offers[foundIndex] = offer;
          }
        })
      }
    }

  }

}
