import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(email: string, mdp: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/login',
      {
        email: email,
        mdp: mdp,
      },
      { responseType: 'json' }
    );
  }
}