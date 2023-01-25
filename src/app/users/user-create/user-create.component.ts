import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit, OnDestroy {
  isLoading = false;

  constructor(
    public usersService: UsersService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
  }

  Inscription(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = false;
    console.log(form.value);

    this.usersService.addUser(
      form.value.nom,
      form.value.prenom,
      form.value.date,
      form.value.email,
      form.value.password
    );
    form.resetForm();
  }

  ngOnDestroy(): void {

  }
}
