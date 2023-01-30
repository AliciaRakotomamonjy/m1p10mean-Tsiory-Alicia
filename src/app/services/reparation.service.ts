
import { Injectable } from '@angular/core';
import { ReparationClient } from '../clients/reparation.client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {

  constructor(private reparationClient : ReparationClient) { }

  public updateReparationEtat(id_reparation: string,etat: number) {
    return this.reparationClient.updateReparationEtat(id_reparation,etat);
  } 


  public getDetailsReparation(id_reparation : string) : Observable<any>{
    return this.reparationClient.getDetailsReparation(id_reparation);
  }

  public ajouterTypeReparations(id_reparation: string,type_reparations: string[]) : Observable<any>{
    return this.reparationClient.ajouterListeTypeReparation(id_reparation,type_reparations)
  }

  public modifierAvancement(id: string, avancement: number) : Observable<any>{
    return this.reparationClient.modifierAvancement(id,avancement);
  }
}
