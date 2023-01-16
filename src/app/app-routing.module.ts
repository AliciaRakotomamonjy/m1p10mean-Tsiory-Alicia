import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TemplateComponent } from './components/template/template.component';
import { AuthGuard } from './helpers/auth.guard';
import { UserAuthComponent } from './users/user-auth/user-auth.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  { path : '', component: TemplateComponent},
  { path : 'user-list', component:UserListComponent },
  { path : 'user-create', component:UserCreateComponent },
  { path : 'login', component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
