import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReparationService } from '../reparations.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'reparations-en-cours',
  templateUrl: './reparation-en-cours.component.html',
  styleUrls: ['./reparation-en-cours.component.css'],
})
export class ReparationEncoursComponent implements OnInit, OnDestroy {
  reparationencours$!: Observable<any>;
  isLoading = false;
  isSuccess = false;
  private idvoiture: any;

  constructor(
    public repartionserv: ReparationService,
    public route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('tonga ato oo');

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idvoiture')) {
        this.idvoiture = paramMap.get('idvoiture');
        this.isLoading = true;
        this.reparationencours$ = this.repartionserv.getReparationEnCours(this.idvoiture);
        this.isLoading = false;

        console.log(this.repartionserv.getReparationEnCours(this.idvoiture));
      } else {
      }
    });
  }

  ngOnDestroy() {}
}
