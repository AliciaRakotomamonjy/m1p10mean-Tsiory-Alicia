import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit, OnDestroy {
  isLoading = false;
  isSuccess = false;

  constructor(
    public usersService: UsersService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
  }

  Inscription(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this.isLoading = true;
    this.usersService
      .addUser(
        form.value.nom,
        form.value.prenom,
        form.value.date,
        form.value.email,
        form.value.password
      )
      .subscribe(
        (responseData) => {
          // const id = responseData.userId;
          // user._id = id;
          console.log(responseData);
          // return responseData;
          this.isLoading = false;
          this.isSuccess = true;
          form.resetForm();
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('request failed : ' + error);
          this.isLoading = false;
        }
      );

  }

  ngOnDestroy(): void {}
}
