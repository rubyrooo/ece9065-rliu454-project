import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
//import { Latest } from './latest.model';

@Injectable({
  providedIn: 'root'
})
export class LatestService {
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }

  getTopTen() {
    return this.http.get(environment.apiBaseUrl + '/open/song');
  }




}
