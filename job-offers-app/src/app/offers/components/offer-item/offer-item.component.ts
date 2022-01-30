import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobOffer} from "../../models/offer.model";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../auth/models/user.model";

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss']
})
export class OfferItemComponent implements OnInit {

  @Input() offer: JobOffer = null!;
  @Input() isInMyCandidacies = false;
  @Input() applicationStatus = "";

  @Output() deleteClicked = new EventEmitter<number>();
  @Output() likeDislikeClicked = new EventEmitter<number>();

  currentUser!: User;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getLoggedUserFromLocalStorage();
    if (user !== null) {
      this.currentUser = user;

      console.log(this.offer.jobLikes?.some(o => o.userId === this.currentUser.id))
    }
    this.isAdmin = this.authService.hasPermissions('admin');
  }

  onDelete(): void {
    this.deleteClicked.emit(this.offer.id);
  }

  isOfferLiked(): boolean {
    if (this.offer.jobLikes) {
      return this.offer.jobLikes.some(o => o.userId === this.currentUser.id);
    }

    return false;
  }

  onLikeDislike(): void {
    this.likeDislikeClicked.emit(this.offer.id);
  }

}
