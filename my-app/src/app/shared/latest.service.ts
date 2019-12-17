import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Review } from './review.model';

@Injectable({
  providedIn: 'root'
})
export class LatestService {



  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }

  getTopTen() {
    return this.http.get(environment.apiBaseUrl + '/open/song');
  }

  searchSong(id){
    return this.http.get(environment.apiBaseUrl + '/open/song/search/' + id);
  }

  searchReview(id){
    return this.http.get(environment.apiBaseUrl + '/secure/reviews/' + id);
  }
  writeReview(review: Review){
    console.log("review"+review);
    return this.http.post(environment.apiBaseUrl + '/secure/reviews',review);
  }

}
