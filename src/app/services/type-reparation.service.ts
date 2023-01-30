import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeReparationClient } from '../clients/typeReparation.client';

@Injectable({
  providedIn: 'root'
})
export class TypeReparationService {

  constructor(private typeReparationClient : TypeReparationClient) { }


  getAllTypeReparations() : Observable<any>{
    return this.typeReparationClient.getTypeReparations()
  }

  getTypeReparations(id_reparation : string) : Observable<any>{
    return this.typeReparationClient.getTypeReparationsDisponible(id_reparation)
  }
}
