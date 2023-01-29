import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReparationService } from '../reparations.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'details-reparations',
  templateUrl: './details-reparations.component.html',
  styleUrls: ['./details-reparations.component.css'],
})
export class DetailsReparComponent implements OnInit, OnDestroy {
  detailsrepa$!: Observable<any>;
  isLoading = false;
  isSuccess = false;
  private idreparation: any;

  constructor(
    public repartionserv: ReparationService,
    public route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('tonga ato oo');

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idreparation')) {
        this.idreparation = paramMap.get('idreparation');
        this.isLoading = true;
        this.detailsrepa$ = this.repartionserv.getDetailsReparations(this.idreparation);
        this.isLoading = false;

        // console.log(this.repartionserv.getReparationEnCours(this.idvoiture));
      } else {
      }
    });
  }

  ngOnDestroy() {}
}
