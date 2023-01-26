import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationAtelierService } from 'src/app/services/authentification-atelier.service';

@Component({
  selector: 'app-login-atelier',
  templateUrl: './login-atelier.component.html',
  styleUrls: ['./login-atelier.component.css']
})
export class LoginAtelierComponent {
  public loginForm!: FormGroup;
  public message : string = "";
  public loading : boolean = false;

  constructor(private authenticationService: AuthentificationAtelierService,private router : Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    console.log(this.loginForm)
    this.loading = true;
    this.authenticationService.login(
      this.loginForm.get('username')!.value,
      this.loginForm!.get('password')!.value
    ).subscribe(
      res=>{
        localStorage.setItem(this.authenticationService.getTokenKey(), res.token);
        this.router.navigate(['/']);
      }, 
      err => {
        this.message = err.error.message
        this.loading = false;
      }
    )
  }

}
