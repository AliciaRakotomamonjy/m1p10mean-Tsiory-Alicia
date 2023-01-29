import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAtelierComponent } from './components/login-atelier/login-atelier.component';
import { LoginFinancierComponent } from './components/login-financier/login-financier.component';
import { LoginComponent } from './components/login/login.component';
import { TemplateComponent } from './components/template/template.component';
import { ClientGuard } from './helpers/client.guard';
import { UserAuthComponent } from './users/user-auth/user-auth.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { MesVoituresComponent } from './voitures/mes-voitures/mes-voitures.component';
import { ReparationEncoursComponent } from './reparations/reparation-en-cours/reparation-en-cours.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    canActivate: [ClientGuard],
    children: [
      { path: 'mesvoitures', component: MesVoituresComponent },
      { path: 'reparationencours/:idvoiture', component: ReparationEncoursComponent },
    ],
  },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-atelier', component: LoginAtelierComponent },
  { path: 'login-financier', component: LoginFinancierComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
