
import { Injectable } from '@angular/core';
import { ReparationClient } from '../clients/reparation.client';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {

  constructor(private reparationClient : ReparationClient) { }

  public updateReparationEtat(id_reparation: string,etat: number) {
    return this.reparationClient.updateReparationEtat(id_reparation,etat);
  } 
}
