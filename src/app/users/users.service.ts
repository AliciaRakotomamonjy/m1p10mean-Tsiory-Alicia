import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./user.model";
import {environment } from '../../environments';


@Injectable({providedIn:'root'})
export class UsersService{

  constructor(private http: HttpClient, private router: Router){}

  addUser(nom:string, prenom:string,  date_naissance:Date,email : string,mdp:string){
    const user: User = {_id:"id",nom:nom,prenom:prenom,date_naissance:date_naissance,email:email,mdp:mdp};
    console.log(user);
    return this.http.post<{message:string, userId: string}>(environment.apiUrl +'/users',user);
  }
}
