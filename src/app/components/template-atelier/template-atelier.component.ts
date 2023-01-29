import { Component} from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, Observable } from 'rxjs';
import { AuthentificationAtelierService } from 'src/app/services/authentification-atelier.service';
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
      name: 'Kanboard',
      icon: 'view_kanban',
      link: "/atelier/kanboard"
    }
  ];
  
  constructor( private breakpointObserver : BreakpointObserver, private authentificationService : AuthentificationAtelierService){
  }


  public logout(){
    this.authentificationService.logout();
  }
}
