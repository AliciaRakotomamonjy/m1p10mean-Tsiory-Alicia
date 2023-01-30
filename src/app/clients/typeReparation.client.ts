import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class TypeReparationClient {
 
  constructor(private http: HttpClient) {}

  public getTypeReparations() : Observable<any>{
    return this.http.get(environment.apiUrl + "/typereparations");
  }

  getTypeReparationsDisponible(id_reparation: string): Observable<any> {
    return this.http.get(environment.apiUrl + "/typereparations/reparations/disponible/"+id_reparation);
  }

  
}