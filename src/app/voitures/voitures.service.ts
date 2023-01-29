import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map, Subject } from 'rxjs';
import { environment } from '../../environments';
import { MyCar } from './mesvoitures.model';

const BACKEND_URL = environment.apiUrl + '/client/voitures';

@Injectable({ providedIn: 'root' })
export class VoitureService {
  private mesvoitures: MyCar[] = [];
  private carUpdated = new Subject<{ car: MyCar[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getmyCar() {
    this.http
      .get<{ message:string; mesvoitures: any }>(BACKEND_URL + '/me')
      .pipe(
        map((responseData) => {
          // console.log(responseData);
          return {
            mesvoitures: responseData.mesvoitures.map((car:any) => {
              console.log(car);
              return {
                voiture: car.voiture,
                etat: car.etat,
              };
            }),
          };
        })
      )
      .subscribe((transformedPost) => {
        console.log(transformedPost);
        this.mesvoitures = transformedPost.mesvoitures;
        this.carUpdated.next({ car: [...this.mesvoitures] });
      });
  }
  getCarUpdateListener() {
    return this.carUpdated.asObservable();
  }
}