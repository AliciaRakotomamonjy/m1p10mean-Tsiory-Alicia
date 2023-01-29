import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EtatService } from 'src/app/services/etat.service';
import { ReparationService } from 'src/app/services/reparation.service';
@Component({
  selector: 'app-kanboard',
  templateUrl: './kanboard.component.html',
  styleUrls: ['./kanboard.component.css']
})
export class KanboardComponent implements OnInit {
  items = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'];

  basket = ['Oranges', 'Bananas', 'Cucumbers'];

  autre = ['Potatoes', 'Pringles', 'Chips'];

  etats : any[] = [] ;
  width!: number;

  constructor(private etatService : EtatService, private reparationService : ReparationService){}

  ngOnInit(): void {
    this.etatService.getAllEtatAvecReparation().subscribe(
      res=>{
        this.etats = res.data;
        this.width = this.etats.length && this.etats.length !== 0 ? Math.trunc(100 / this.etats.length ) : 0;
      },error =>{
        console.error(error)
      }
    )
  }

  

  drop(etat : number,event: CdkDragDrop<any[]>) {
    console.log(event)
    console.log(event.item.data)
    console.log(etat)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const reparation = event.item.data
      this.reparationService.updateReparationEtat(reparation._id,etat).subscribe(
        res=>{
          console.log(res)
        },error=>{
          console.error(error);
          
        }
      )
      
    }
  }
}
