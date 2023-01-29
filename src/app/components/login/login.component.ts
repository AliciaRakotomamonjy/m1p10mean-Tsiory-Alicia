
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public message : string = "";
  public loading : boolean = false;

  constructor(private authenticationService: AuthentificationService,private router : Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    this.loading = true;
    this.authenticationService.login(
      this.loginForm.get('username')!.value,
      this.loginForm!.get('password')!.value
    ).subscribe(
      res=>{
        localStorage.setItem(this.authenticationService.getTokenKey(), res.token);
        this.router.navigate(['/mesvoitures']);
      },
      err => {
        this.message = err.error.message
        this.loading = false;
      }
    )


  }
}
