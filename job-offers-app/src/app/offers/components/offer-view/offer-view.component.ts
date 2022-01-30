import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OffersService} from "../../services/offers.service";
import {JobOffer} from "../../models/offer.model";

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss']
})
export class OfferViewComponent implements OnInit {

  offer: JobOffer;

  constructor(private route: ActivatedRoute,
              private offerService: OffersService,
              private router: Router) {
    this.offer = {
      id: 0,
      title: "",
      description: "",
      type: "",
      category: "",
      likesCount: 0
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        const id = params['id'];

        if (id) {
          this.offerService.getOffer(id).subscribe({
            next: (res) => {
              this.offer = res;
              console.log(this.offer)
            }
          })
        }
      }
    })
  }

}
