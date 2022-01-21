import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {JobOffer} from "../models/job-offer.model";
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JobOffersService {

  constructor(private http: HttpClient) { }

  getJobOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${environment.apiUrl}/job-offers`);
  }

}
