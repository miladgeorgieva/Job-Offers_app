import {Component, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {JobOffer} from "../../models/offer.model";
import {OffersService} from "../../services/offers.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.scss']
})

export class OfferCreateComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private offerService: OffersService,
              private router: Router) {
    this.formGroup = this.fb.group({
      title: [''],
      category: [''],
      type: [''],
      description: [''],
      likesCount: [0]
    });
  };

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        const id = params['id'];

        if (id) {
          this.offerService.getOffer(id).subscribe({
            next: (res) => {
              this.buildForm(res);
            }
          })
        }
      }
    })
  }

  onSubmit() : void {
    const offer = this.formGroup.value as JobOffer;

    let request;

    if (!offer.id) {
      request = this.offerService.postOffer(offer);
    } else {
      request = this.offerService.putOffer(offer);
    }

    request.subscribe({
      next: () => {
        this.router.navigate(['/listing'])
      }
    });
  }

  private buildForm(offer?: JobOffer) {
    this.formGroup = this.fb.group({
      id: offer?.id,
      title: [offer?.title || '', [Validators.required]],
      category: [offer?.category || '', [Validators.required]],
      type: [offer?.type || '', [Validators.required]],
      description: [offer?.description || ''],
      likesCount: [offer?.likesCount || 0]
    })
  }
}
