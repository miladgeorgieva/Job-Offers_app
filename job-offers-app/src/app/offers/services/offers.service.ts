import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {JobOffer} from "../models/offer.model";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {JobLike} from "../models/job-like.model";
import {JobApplication} from "../models/job-application.model";

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) { }

  getJobOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${environment.apiUrl}/jobOffers?_embed=jobLikes&_expand=user&_embed=jobApplications`);
  }

  getUsersOffers(id: number): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${environment.apiUrl}/jobOffers?userId=${id}?_embed=jobLikes&_expand=user_embed=jobApplications`);
  }

  getOffer(id: number): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${environment.apiUrl}/jobOffers/${id}?_embed=jobLikes&_expand=user&_embed=jobApplications`)
  }

  postOffer(offer: JobOffer): Observable<JobOffer> {
    return this.http.post<JobOffer>(`${environment.apiUrl}/jobOffers`, offer)
  }

  putOffer(offer: JobOffer): Observable<JobOffer> {
    return this.http.put<JobOffer>(`${environment.apiUrl}/jobOffers/${offer.id}`, offer)
  }

  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/jobOffers/${id}`)
  }

  like(jobLike: JobLike): Observable<JobLike> {
    return this.http.post<JobLike>(`${environment.apiUrl}/jobLikes`, jobLike);
  }

  dislike(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/jobLikes/${id}`);
  }

  getJobApplicationsForJob(id: number): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${environment.apiUrl}/jobApplications?_expand=user&jobOfferId=${id}`);
  }

  getJobApplicationsForUser(id: number): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${environment.apiUrl}/jobApplications?_expand=jobOffer&_expand=user&userId=${id}`);
  }

  putJobApplication(jobApplication: JobApplication): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${environment.apiUrl}/jobApplications/${jobApplication.id}`, jobApplication);
  }

  applyForJob(jobApplication: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(`${environment.apiUrl}/jobApplications`, jobApplication);
  }
}
