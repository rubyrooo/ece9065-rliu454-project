import { Injectable } from '@angular/core';
import { Playlist } from './playlist.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  model: Playlist = {
    userN: '',
    playlistN: '',
    status: '',
    description: ''
  };

  constructor(private http: HttpClient) { }

  postPlaylist(playlist: Playlist){
  
    return this.http.post(environment.apiBaseUrl+'/secure/playlist',playlist);
  }
}
