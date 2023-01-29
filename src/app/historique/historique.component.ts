import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { VoitureService } from '../voitures/voitures.service';

@Component({
  selector: 'historique-reparation',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css'],
})
export class HistoComponent implements OnInit, OnDestroy {
  isLoading = false;
  isSuccess = false;
  historique$!: Observable<any>;
  idvoiture: any;

  constructor(
    private voitureservice : VoitureService,
    public route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('tonga ato historique');


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idvoiture')) {
        this.idvoiture = paramMap.get('idvoiture');
        console.log(this.idvoiture);
        this.isLoading = true;
        this.historique$ = this.voitureservice.historique(this.idvoiture);
        this.isLoading = false;

        // console.log(this.repartionserv.getReparationEnCours(this.idvoiture));
      } else {
      }
    });
  }

  ngOnDestroy() {}
}


