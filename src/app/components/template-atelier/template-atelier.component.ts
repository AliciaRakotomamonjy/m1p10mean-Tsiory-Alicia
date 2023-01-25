import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';
@Component({
  selector: 'app-template-atelier',
  templateUrl: './template-atelier.component.html',
  styleUrls: ['./template-atelier.component.css']
})
export class TemplateAtelierComponent {

    isHandset : Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    )

    menus : any[] = [
      {
        name: 'Réceptionner voiture',
        icon: 'home',
        link: "/accueil"
      }
    ];
    constructor(private breakpointObserver : BreakpointObserver, private authentificationService : AuthentificationService){ }

    public logout(){
      this.authentificationService.logout();
    }
}
