import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { map, Subject } from 'rxjs';
import { environment } from '../../environments';

const BACKEND_URL = environment.apiUrl + '/reparation';

@Injectable({ providedIn: 'root' })
export class ReparationService {
  constructor(private http: HttpClient, private router: Router) {}

  getReparationEnCours(id: string): Observable<any> {
    return this.http.get<any>(BACKEND_URL + '/reparationencours/' + id);
  }
}
