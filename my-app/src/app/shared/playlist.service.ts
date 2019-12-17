import { Injectable } from '@angular/core';
import { Playlist } from './playlist.model';
import { Userplaylist } from './userplaylist.model';
import { User_Playlist_Description } from './user_playlist_description.model';
import { User_Playlist_Status } from './user_playlist_status.model';
import { User_Creater_Playlist } from './user_creater_playlist.model';
import { User_PlaylistN_NewplaylistN } from './user_playlist_newplaylist.model';
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

  user_creater_playlistmodel: User_Creater_Playlist = {
    playlistN: '',
    userN: '',
    createrN: ''
  };

  user_playlistmodel: Userplaylist = {
    playlistN: '',
    userN: '',
    songN: ''
  };

  user_playlist_description_model: User_Playlist_Description = {
    playlistN: '',
    userN: '',
    description: ''
  };

  user_playlist_status_model: User_Playlist_Status = {
    playlistN: '',
    userN: '',
    status: ''
  };
  constructor(private http: HttpClient) { }

  postPlaylist(playlist: Playlist){

    return this.http.post(environment.apiBaseUrl+'/secure/playlist/create',playlist);
  }

  //userN, playlistN, songList
  postUserplaylist(userplaylist: Userplaylist){
    return this.http.post(environment.apiBaseUrl+ '/secure/songplaylist/save', userplaylist);
  }
  
  searchPlaylist(id){
    return this.http.get(environment.apiBaseUrl + '/secure/search/playlist/' + id);
  }

  //not used!!
  searchSonginplaylist(playlistN_userN){
    return this.http.get(environment.apiBaseUrl + '/secure/search/playlistsong/' + playlistN_userN);
  }

  addasmyplaylist(user_creater_playlist: User_Creater_Playlist){
    return this.http.post(environment.apiBaseUrl+ '/secure/asmyplaylist/add', user_creater_playlist);
  }

  //get user's playlist
  getmyPlaylist(id){
    return this.http.get(environment.apiBaseUrl+ '/secure/playlist/'+ id);
  }

  //delete song in playlist
  deletesonginPlaylist(userplaylist: Userplaylist){
    return this.http.post(environment.apiBaseUrl+ '/secure/songplaylist/delete', userplaylist);
  }


  //update playlist description
  updatePlaylistDes(User_Playlist_Description: User_Playlist_Description){
    return this.http.post(environment.apiBaseUrl+ '/secure/playlist/description/update', User_Playlist_Description);
  }


  //update playlist status
  updatePlaylistStatus(User_Playlist_Status: User_Playlist_Status){
    return this.http.post(environment.apiBaseUrl+ '/secure/playlist/status/update', User_Playlist_Status);
  }
  
  updatePlaylistName(User_PlaylistN_NewplaylistN: User_PlaylistN_NewplaylistN){
    return this.http.post(environment.apiBaseUrl+ '/secure/playlist/name/update', User_PlaylistN_NewplaylistN);
  }

}
