import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  hasUser$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  login$(data: Login): Observable<User | null> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      map((response: User[]) => {
        const user = response.find((u => u.email === data.email && u.password === data.password));

        if (!user) {
          return null;
        }

        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.setHasUser(false);
  }

  hasPermissions(role: string): boolean {
    const loggedUser = this.getLoggedUserFromLocalStorage();

    if (loggedUser !== null) {
      return loggedUser.role === role;
    } else {
      return false;
    }
  }

  setLoggedUserInLocalStorage(user: User): void {
    delete user.password;

    localStorage.setItem('loggedUser', JSON.stringify(user));

    this.setHasUser(true);
  }

  getLoggedUserFromLocalStorage(): User | null {
    const currentUser = localStorage.getItem('loggedUser');
    let loggedUser = null;

    if (currentUser) {
      loggedUser = JSON.parse(currentUser);
      if (loggedUser) {
        this.setHasUser(true);
      }
    }

    return loggedUser;
  }

  getHasUser$(): Observable<boolean> {
    return this.hasUser$.asObservable();
  }

  setHasUser(value: boolean): void {
    this.hasUser$.next(value);
  }
}
