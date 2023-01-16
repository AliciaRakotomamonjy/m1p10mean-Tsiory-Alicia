import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, Observable } from 'rxjs';

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
    constructor(private breakpointObserver : BreakpointObserver){ }
}
