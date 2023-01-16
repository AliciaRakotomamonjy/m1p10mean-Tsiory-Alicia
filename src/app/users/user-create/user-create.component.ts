import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "../users.service";

@Component({
  selector:'app-user-create',
  templateUrl :'./user-create.component.html',
  styleUrls : ['./user-create.component.css']
})
export class UserCreateComponent {

  constructor(public usersService: UsersService, public route:ActivatedRoute) {}

  onSavePost(form: NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value);

    this.usersService.addUser(form.value.nom,form.value.prenom,form.value.date,form.value.email,form.value.password);
    form.resetForm();
  }
}
