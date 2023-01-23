import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(email: string, mdp: string): Observable<any> {
    return this.http.post(environment.apiUrl +'/login',
      {
        email: email,
        mdp: mdp,
      },
      { responseType: 'json' }
    );
  }
}
