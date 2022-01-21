import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {JobOffer} from "../../models/job-offer.model";
import {JobOffersService} from "../../services/job-offers.service";

@Component({
  selector: 'app-job-offers-listing',
  templateUrl: './job-offers-listing.component.html',
  styleUrls: ['./job-offers-listing.component.scss']
})
export class JobOffersListingComponent implements OnInit {

  jobOffers: JobOffer[] = [];

  constructor(private jobOffersService: JobOffersService) { }

  ngOnInit(): void {
    this.jobOffersService.getJobOffers().subscribe({
      next: (response: JobOffer[]) => {
        this.jobOffers = response;
        console.log(this.jobOffers);
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
      }
    });
  }

}
