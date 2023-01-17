import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./user.model";


@Injectable({providedIn:'root'})
export class UsersService{

  constructor(private http: HttpClient, private router: Router){}

  addUser(nom:string, prenom:string,  date_naissance:Date,email : string,mdp:string){
    const user: User = {_id:"id",nom:nom,prenom:prenom,date_naissance:date_naissance,email:email,mdp:mdp};
    console.log(user);
    this.http.post<{message:string, userId: string}>('http://localhost:3000/api/users',user)
    .subscribe((responseData)=> {
      const id = responseData.userId;
      user._id = id;
      console.log(responseData);
      this.router.navigate(['/']);
    });
  }
}
