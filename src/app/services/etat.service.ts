import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EtatClient } from '../clients/etat.client';

@Injectable({
  providedIn: 'root'
})
export class EtatService {

  private listeEtat = new BehaviorSubject<any[]>([])

  constructor(private etatClient : EtatClient) { }

  public getAllEtat() : Observable<any> {
    return this.etatClient.getEtats();
  }

  public getAllEtatAvecReparation() : Observable<any> {
    return this.etatClient.getEtatsReparations();
  }
}
