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
}