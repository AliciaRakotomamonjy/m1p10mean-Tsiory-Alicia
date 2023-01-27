import { Component, OnInit, OnDestroy } from '@angular/core';
import { VoitureService } from '../voitures.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyCar } from '../mesvoitures.model';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'mes-voitures',
  templateUrl: './mes-voitures.component.html',
  styleUrls: ['./mes-voitures.component.css'],
})
export class MesVoituresComponent implements OnInit, OnDestroy {
  mesvoitures: MyCar[] = [];
  isLoading = false;
  isSuccess = false;
  private idpersonne: any;
  private carSub: Subscription;

  constructor(
    public voitureservice: VoitureService,
    public route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('tonga ato oo');

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idpersonne')) {
        this.idpersonne = paramMap.get('idpersonne');
        this.isLoading = true;
        this.voitureservice.getmyCar(this.idpersonne);
        this.carSub = this.voitureservice
          .getCarUpdateListener()
          .subscribe((data) => {
            console.log(data);
            this.isLoading = false;
            this.mesvoitures = data.car;
          });
      } else {
      }
    });
  }

  ngOnDestroy() {}

  openDialog() {
    const dialogRef = this.dialog.open(CreationVoiture);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'creationVoiture',
  templateUrl: 'creation-voiture.component.html',
})
export class CreationVoiture {}
