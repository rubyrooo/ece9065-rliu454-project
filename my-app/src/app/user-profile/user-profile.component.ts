import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { PlaylistService } from '../shared/playlist.service';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';
import{Userplaylist}from'../shared/userplaylist.model';
import{User_Playlist_Status}from'../shared/user_playlist_status.model';
import{User_Playlist_Description}from'../shared/user_playlist_description.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  myPlaylist;
  userEmail: String;
  User_Playlist_Description=new User_Playlist_Description; 
  User_Playlist_Status=new User_Playlist_Status; 
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

    this.Playlist_User_Song.userN = this.userDetails.email;
    this.Playlist_User_Song.playlistN=this.myPlaylist[i].playlistN; 
    this.temp=this.myPlaylist[i].songList;
    this.show = true;

  }

  deletesong(j){
    

    this.Playlist_User_Song.songN=this.temp[j];
    this.playlistService.deletesonginPlaylist(this.Playlist_User_Song).subscribe(
      res => {
       this.showSucessMessage="change successfully"; 
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  Modify(i){
    this.User_Playlist_Description.userN = this.appComponent.owner;
    this.User_Playlist_Description.playlistN = this.myPlaylist[i].playlistN;
    this.User_Playlist_Description.description = document.getElementById('description')["value"];

    console.log("A",this.User_Playlist_Description);
    this.playlistService.updatePlaylistDes(this.User_Playlist_Description).subscribe( 
   
      res => {
      this.showSucessMessage = "Create Successfully";
    
  
    },
    err => {
      console.log(err.error.message);
    })

  }

  Changestatus(i){
  
    this.User_Playlist_Status.userN = this.appComponent.owner;
    this.User_Playlist_Status.playlistN = this.myPlaylist[i].playlistN;
    this.User_Playlist_Status.status = document.getElementById('status')["value"];
    console.log("B",this.User_Playlist_Status);

    this.playlistService.updatePlaylistStatus(this.User_Playlist_Status).subscribe( 
        res => {
          this.showSucessMessage = "Create Successfully";
        
        },
        err => {
          console.log(err.error.message);
        })
  }
} 