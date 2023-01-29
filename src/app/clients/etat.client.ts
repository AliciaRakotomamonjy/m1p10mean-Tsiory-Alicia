import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class EtatClient {
  constructor(private http: HttpClient) {}

  public getEtats() : Observable<any>{
    return this.http.get(environment.apiUrl + "/etats");
  }

  public getEtatsReparations() : Observable<any>{
    return this.http.get(environment.apiUrl + "/etats/reparations");
  }
}