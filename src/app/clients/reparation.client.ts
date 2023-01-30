import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class ReparationClient {
  
  constructor(private http: HttpClient) {}

  public updateReparationEtat(id_reparation : string ,etat : number) : Observable<any>{
    return this.http.put(environment.apiUrl+"/reparation/"+id_reparation,{ etat });
  }

  public getDetailsReparation(id_reparation: string): Observable<any> {
    return this.http.get(environment.apiUrl+"/reparation/"+id_reparation)
  }

  public ajouterListeTypeReparation(id_reparation: string, type_reparations: string[]){
    return this.http.post(environment.apiUrl+"/detailsreparation",{ reparation:id_reparation,type_reparations:type_reparations })
  }

  public modifierAvancement(id: string, avancement: number) : Observable<any>{
    return this.http.put(environment.apiUrl+"/detailsreparation/"+id,{  avancement : avancement })
  }
}