import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {JobOffer} from "../models/offer.model";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) { }

  getJobOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${environment.apiUrl}/job-offers`);
  }

  getOffer(id: number): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${environment.apiUrl}/job-offers/${id}`)
  }

  postOffer(offer: JobOffer): Observable<JobOffer> {
    return this.http.post<JobOffer>(`${environment.apiUrl}/job-offers`, offer)
  }

  putOffer(offer: JobOffer): Observable<JobOffer> {
    return this.http.put<JobOffer>(`${environment.apiUrl}/job-offers/${offer.id}`, offer)
  }

  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/job-offers/${id}`)
  }
}
