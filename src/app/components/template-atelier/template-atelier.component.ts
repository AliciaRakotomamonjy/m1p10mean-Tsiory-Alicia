import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { AuthentificationAtelierService } from 'src/app/services/authentification-atelier.service';
@Component({
  selector: 'app-template-atelier',
  templateUrl: './template-atelier.component.html',
  styleUrls: ['./template-atelier.component.css']
})
export class TemplateAtelierComponent implements AfterViewInit{

  @ViewChild('header') header!: ElementRef;
  @ViewChild('mainContent') mainContent!: ElementRef;
  @ViewChild('footer') footer!: ElementRef;
 
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
  
  constructor(private el: ElementRef, private breakpointObserver : BreakpointObserver, private authentificationService : AuthentificationAtelierService){

    }
  ngAfterViewInit(): void {
    const headerHeight = this.header.nativeElement.offsetHeight;
    const footerHeight = this.footer.nativeElement.offsetHeight;
    const mainContentHeight = this.el.nativeElement.offsetHeight - headerHeight - footerHeight;

    // Appliquer les dimensions au contenu principal
    this.mainContent.nativeElement.style.height = `${mainContentHeight}px`;
  }

    public logout(){
      this.authentificationService.logout();
    }
}
