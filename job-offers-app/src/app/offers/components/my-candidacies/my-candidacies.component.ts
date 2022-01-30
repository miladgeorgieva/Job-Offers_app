import { Component, OnInit } from '@angular/core';
import {JobOffer} from "../../models/offer.model";
import {HttpErrorResponse} from "@angular/common/http";
import {OffersService} from "../../services/offers.service";
import {AuthService} from "../../../auth/services/auth.service";
import {JobApplication} from "../../models/job-application.model";

@Component({
  selector: 'app-my-candidacies',
  templateUrl: './my-candidacies.component.html',
  styleUrls: ['./my-candidacies.component.scss']
})
export class MyCandidaciesComponent implements OnInit {

  jobApplications: JobApplication[] = [];

  constructor(private offersService: OffersService, private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getLoggedUserFromLocalStorage();
    if (user) {
      this.offersService.getJobApplicationsForUser(user.id).subscribe({
        next: (response: JobApplication[]) => {
          this.jobApplications = response;
        },
        error: (response: HttpErrorResponse) => {
          // console.log(response);
        }
      });
    }
  }

}
