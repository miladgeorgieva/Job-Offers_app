import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobOffer} from "../../models/offer.model";

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss']
})
export class OfferItemComponent implements OnInit {

  @Input() offer: JobOffer = null!;

  @Output() deleteClicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(): void {
    this.deleteClicked.emit(this.offer.id);
  }

}
