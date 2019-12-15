import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { PlaylistService } from '../shared/playlist.service';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';
import{Userplaylist}from'../shared/userplaylist.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  myPlaylist;
  userEmail: String;
  Playlist_User_Song=new Userplaylist; 
  temp;
  show;
  showSucessMessage;
  constructor(private playlistService: PlaylistService,private userService: UserService, private router: Router, public appComponent: AppComponent) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
    
        this.appComponent.owner = this.userDetails.email;
        console.log("Where"+ this.appComponent.owner);
        
        //get my Playlist
        this.playlistService.getmyPlaylist(this.userDetails.email).subscribe(
          res => {
            this.myPlaylist = res;
            console.log("getmyPlaylist");
            console.log(this.myPlaylist[1]);
          },
          err => { 
            console.log(err);
            
          }); 


    
      },
      err => { 
        console.log("something wrong")
      }
    );


  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  deletesongclick(i){
    console.log("SHOULD BE A SONG LIST");
    this.Playlist_User_Song.userN = this.userDetails.email;
    this.Playlist_User_Song.playlistN=this.myPlaylist[i].playlistN; 
    this.temp=this.myPlaylist[i].songList;
    this.show = true;

  }

  deletesong(j){
    

    this.Playlist_User_Song.songN=this.temp[j];
    console.log("A",this.Playlist_User_Song.songN);
    console.log("B",this.Playlist_User_Song.userN);
    console.log("C",this.Playlist_User_Song.playlistN);

    this.playlistService.deletesonginPlaylist(this.Playlist_User_Song).subscribe(
      res => {
       this.showSucessMessage="change successfully"; 
      },
      err => { 
        console.log(err);
        
      }
    );
  }

}