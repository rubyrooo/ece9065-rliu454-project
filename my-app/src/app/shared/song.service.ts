import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Song } from './song.model';
import { Song_Status } from './song_status.model';

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

  song_status_model: Song_Status = {
    title: '',
    hidden: false
  };
  

  constructor(private http: HttpClient) { }

  postSong(song: Song){
    console.log("HERE"+ song);
    return this.http.post(environment.apiBaseUrl+'/secure/song',song);
  }

  getAllSong(){
    return this.http.get(environment.apiBaseUrl+'/admin/songs');
  }

  //update song status
  updateSongStatus(song_status: Song_Status){
    return this.http.post(environment.apiBaseUrl+ '/admin/songstatus/update', song_status);
  }
}
