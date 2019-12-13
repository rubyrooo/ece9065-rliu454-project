import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Song } from './song.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  model: Song = {
    header:  '',
    title: '',
    artist: '',
    alblum: '',
    year:  '',
    comment: '', 
    reserve: '',
    track: '',
    genre: '',
    addN: ''
  };

  constructor(private http: HttpClient) { }

  postSong(song: Song){
    console.log("HERE"+ song);
    return this.http.post(environment.apiBaseUrl+'/secure/song',song);
  }
}
