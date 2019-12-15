import { Injectable } from '@angular/core';
import { Playlist } from './playlist.model';
import { Userplaylist } from './userplaylist.model';
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
    description: '',
    songList: []
  };

  userplaylistmodel: Userplaylist = {
    playlistN: '',
    userN: '',
    songN: ''
  };

  constructor(private http: HttpClient) { }

  postPlaylist(playlist: Playlist){

    return this.http.post(environment.apiBaseUrl+'/secure/playlist',playlist);
  }

  //
  postUserplaylist(userplaylist: Userplaylist){
    return this.http.post(environment.apiBaseUrl+ '/secure/savesongplaylist', userplaylist);
  }
  
  searchPlaylist(id){
    return this.http.get(environment.apiBaseUrl + '/secure/search/playlist/' + id);
  }


  searchSonginplaylist(playlistN_userN){
    return this.http.get(environment.apiBaseUrl + '/secure/search/playlistsong/' + playlistN_userN);
  }

}
