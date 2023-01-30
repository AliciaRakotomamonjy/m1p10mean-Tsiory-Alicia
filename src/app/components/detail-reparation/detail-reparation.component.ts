import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ReparationService } from 'src/app/services/reparation.service';
import { TypeReparationService } from 'src/app/services/type-reparation.service';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
@Component({
  selector: 'app-detail-reparation',
  templateUrl: './detail-reparation.component.html',
  styleUrls: ['./detail-reparation.component.css']
})
export class DetailReparationComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['libelle', 'montant','avancement','action'];
  detailsrepa$!: Observable<any>;
  isLoading = true;
  isSuccess = false;
  isFailed = false;
  message = "";
  private idreparation: any;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  typeReparations$ : Observable<any>;
  totalMontant : number = 0;
  moyenneAvancement : number = 0;

  constructor(
    public reparationService: ReparationService,
    private typeReparationService : TypeReparationService,
    public route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}
  
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idreparation')) {
        this.idreparation = paramMap.get('idreparation');
        this.detailsrepa$ = this.reparationService.getDetailsReparation(this.idreparation);
        this.detailsrepa$.subscribe(
          res => {
            if('data' in res){
              let reparation = res.data;
              this.totalMontant = reparation.typereparations.map((t: { montant: number; }) => t.montant).reduce((acc: number, value: number) => acc + value, 0)
              this.moyenneAvancement = reparation.typereparations && reparation.typereparations.length !==0 ? reparation.typereparations.map((t: { avancement: number; }) => t.avancement).reduce((acc: number, value: number) => acc + value, 0)/ reparation.typereparations.length : 0
            }
          },error => {
            console.error(error)
          }
        )
        this.typeReparations$ = this.typeReparationService.getTypeReparations(this.idreparation).pipe(
          map( res => res.data )
        );
        this.isLoading = false;

        // console.log(this.repartionserv.getReparationEnCours(this.idvoiture));
      } else {
      }
    });
  }

  validerListe(liste: MatSelectionList){
    this.isLoading = true
    let typereparations = liste.selectedOptions.selected.map(item => item.value)
    this.reparationService.ajouterTypeReparations(this.idreparation,typereparations)
    .subscribe(
      res => {
        this.isSuccess = true;
        this.message = res.message
      },
      error => {
        console.error(error)
        this.isSuccess = true;
        this.message = error.error.message
      }
    )
    this.detailsrepa$ = this.reparationService.getDetailsReparation(this.idreparation);
      this.detailsrepa$.subscribe(
        res => {
          if('data' in res){
            let reparation = res.data;
            this.totalMontant = reparation.typereparations.map((t: { montant: number; }) => t.montant).reduce((acc: number, value: number) => acc + value, 0)
            this.moyenneAvancement = reparation.typereparations && reparation.typereparations.length !==0 ? reparation.typereparations.map((t: { avancement: number; }) => t.avancement).reduce((acc: number, value: number) => acc + value, 0)/ reparation.typereparations.length : 0
          }
        },error => {
          console.error(error)
        }
      )
      this.typeReparations$ = this.typeReparationService.getTypeReparations(this.idreparation).pipe(
        map( res => res.data )
      );
      this.isLoading = false;
    
  }

  openDialog(type_reparations : any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      data: type_reparations,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.isLoading = true
      this.reparationService.modifierAvancement(result.reparation_join_type,result.avancement)
      .subscribe(
        res => {
          this.isSuccess = true;
          this.message = res.message
        },
        error => {
          console.error(error)
          this.isSuccess = true;
          this.message = error.error.message
        }
      )

      this.detailsrepa$ = this.reparationService.getDetailsReparation(this.idreparation);
      this.detailsrepa$.subscribe(
        res => {
          if('data' in res){
            let reparation = res.data;
            this.totalMontant = reparation.typereparations.map((t: { montant: number; }) => t.montant).reduce((acc: number, value: number) => acc + value, 0)
            this.moyenneAvancement = reparation.typereparations && reparation.typereparations.length !==0 ? reparation.typereparations.map((t: { avancement: number; }) => t.avancement).reduce((acc: number, value: number) => acc + value, 0)/ reparation.typereparations.length : 0
          }
        },error => {
          console.error(error)
        }
      )
      this.typeReparations$ = this.typeReparationService.getTypeReparations(this.idreparation).pipe(
        map( res => res.data )
      );
      this.isLoading = false;
    });


    
  }

}



