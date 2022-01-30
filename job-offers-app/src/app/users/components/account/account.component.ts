import { Component, OnInit } from '@angular/core';
import {User} from "../../../auth/models/user.model";
import {AuthService} from "../../../auth/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JobOffer} from "../../../offers/models/offer.model";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {OffersService} from "../../../offers/services/offers.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user!: User;
  userOffers!: JobOffer[];
  formGroup!: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private usersService: UsersService,
              private router: Router,
              private offersService: OffersService) {

  }

  ngOnInit(): void {
    const user = this.authService.getLoggedUserFromLocalStorage();
    if (user !== null) {
      this.user = user;
      this.buildForm(user);

      this.offersService.getUsersOffers(this.user.id).subscribe({
        next: (offers) => {
          this.userOffers = offers;
        }
      })
    }
  }

  onSubmit() : void {
    const user = this.formGroup.value as User;

    this.usersService.updateUser(user).subscribe({
      next: (user) => {
        this.authService.setLoggedUserInLocalStorage(user);

        this.router.navigate(['/listing'])
      }
    });
  }

  onDelete(): void {
    const user = this.user;

    if (this.authService.hasPermissions('admin')) {
      for (let item of this.userOffers) {
        this.offersService.deleteOffer(item.id);
      }
    }

    this.usersService.deleteUser(user.id).subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/auth', 'login']);
      }
    })
  }

  private buildForm(user: User) {
    this.formGroup = this.fb.group({
      id: user.id,
      username: [user.username, [Validators.required]],
      email: [user.email, [Validators.required]],
      password: [user.password, [Validators.required]]
    })
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }
}
