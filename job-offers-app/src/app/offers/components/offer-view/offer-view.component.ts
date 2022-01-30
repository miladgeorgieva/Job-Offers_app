import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OffersService} from "../../services/offers.service";
import {JobOffer} from "../../models/offer.model";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../auth/models/user.model";
import {JobLike} from "../../models/job-like.model";
import {JobApplication} from "../../models/job-application.model";

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss']
})
export class OfferViewComponent implements OnInit {

  offer: JobOffer;
  jobApplications: JobApplication[] = [];
  currentUser!: User;
  isAdmin: boolean = false;

  constructor(private route: ActivatedRoute,
              private offersService: OffersService,
              private router: Router,
              private authService: AuthService) {
    this.offer = {
      id: 0,
      title: "",
      description: "",
      type: "",
      category: "",
      // likesCount: 0,
      userId: this.authService.getLoggedUserFromLocalStorage()!.id
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        const id = params['id'];

        if (id) {
          this.offersService.getOffer(id).subscribe({
            next: (res) => {
              this.offer = res;

              this.offersService.getJobApplicationsForJob(this.offer.id).subscribe({
                next: (res) => {
                  this.jobApplications = res;
                }
              })
            }
          })
        }
      }
    })

    const user = this.authService.getLoggedUserFromLocalStorage();
    if (user !== null) {
      this.currentUser = user;

      console.log(this.offer.jobLikes?.some(o => o.userId === this.currentUser.id))
    }
    this.isAdmin = this.authService.hasPermissions('admin');
  }

  isOfferLiked(): boolean {
    if (this.offer.jobLikes) {
      return this.offer.jobLikes.some(o => o.userId === this.currentUser.id);
    }

    return false;
  }

  isApplied(): boolean {
    if (this.offer.jobApplications) {
      return this.offer.jobApplications.some(o => o.userId === this.currentUser.id);
    }

    return false;
  }

  onLike(): void {
    const jobLike = {
      userId: this.authService.getLoggedUserFromLocalStorage()?.id,
      jobOfferId: this.offer.id
    } as JobLike;
    this.offersService.like(jobLike).subscribe({
      next: (jobLike) => {
        this.offer.jobLikes?.push(jobLike);
      }
    })
  }

  onDislike(): void {
    let jobLikeId = this.offer.jobLikes?.filter(o => o.userId === this.authService.getLoggedUserFromLocalStorage()?.id);
    if (jobLikeId) {
      if (jobLikeId?.length > 0) {
        this.offersService.dislike(jobLikeId[0].id).subscribe({
          next: () => {
            this.offer.jobLikes = this.offer.jobLikes?.filter(l => l.id !== jobLikeId![0].id);
          }
        })

      }
    }
  }

  onApply(): void {
    const jobApplication = {
      userId: this.authService.getLoggedUserFromLocalStorage()?.id,
      jobOfferId: this.offer.id,
      status: "none"
    } as JobApplication;
    this.offersService.applyForJob(jobApplication).subscribe({
      next: (jobLike) => {
        this.offer.jobApplications?.push(jobLike);
      }
    })
  }

  onApprove(jobApplication: JobApplication): void {
    const approvedApplication = this.jobApplications.filter(a => a.status === 'approved');
    if (approvedApplication.length) {
      console.error('job already has approved application');
    } else {
      const jobApplicationDto = {
        "id": jobApplication.id,
        "userId": jobApplication.userId,
        "jobOfferId": jobApplication.jobOfferId,
        "status": "approved"
      } as JobApplication;
      this.offersService.putJobApplication(jobApplicationDto).subscribe({
        next: (jobApplication) => {
          const foundIndex = this.jobApplications.findIndex(o => o.id === jobApplication.id);
          this.jobApplications[foundIndex] = jobApplication;
        }
      })
    }
  }

  onReject(jobApplication: JobApplication): void {
    const approvedApplication = this.jobApplications.filter(a => a.status === 'approved');
    if (approvedApplication.length) {
      console.error('job already has approved application');
    } else {
      const jobApplicationDto = {
        "id": jobApplication.id,
        "userId": jobApplication.userId,
        "jobOfferId": jobApplication.jobOfferId,
        "status": "rejected"
      } as JobApplication;
      this.offersService.putJobApplication(jobApplicationDto).subscribe({
        next: (jobApplication) => {
          const foundIndex = this.jobApplications.findIndex(o => o.id === jobApplication.id);
          this.jobApplications[foundIndex] = jobApplication;
        }
      })
    }
  }
}
