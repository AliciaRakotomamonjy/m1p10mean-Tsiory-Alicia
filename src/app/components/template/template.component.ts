import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
    isHandset : Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    )

    menus : any[] = [
      {
        name: 'Accueil',
        icon: 'home',
        link: "/accueil"
      },
      {
        name: 'Tableau de bord',
        icon: 'insert_chart',
        link: "/dashboard"
      },
      {
        name: 'Utilisateurs',
        icon: 'supervisor_account',
        link: "/users"
      },
      {
        name: 'Caisse',
        icon: 'credit_card',
        link: "/caisse"
      },
      {
        name: 'Paramétrage',
        icon: 'build',
        link: "/parametrage"
      }
    ];
    constructor(private breakpointObserver : BreakpointObserver, private authentificationService : AuthentificationService){ }

    public logout(){
      this.authentificationService.logout();
    }
}
