import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { PlaylistService } from '../shared/playlist.service';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlistList;
  reviewList;
  details = new Array;
  buttonInfo =new Array;
  songinPlaylist;  
  login;
  userDetails;
  result;

  constructor(private userService: UserService, private playlistService: PlaylistService, private router: Router, public appComponent: AppComponent) { }
  ngOnInit() {
      if(this.userService.isLoggedIn()){
        this.login=true;
      
      this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res['user'];  
          console.log(this.userDetails.email)
        },
        err => { 
          console.log(err);
          
        })}
  }

  onSubmit(form: NgForm) {

    this.playlistService.searchPlaylist(form.value.id).subscribe(
      res => {
        this.playlistList = res;
      },
      err => { 
        console.log(err);
      });
  }

  showDetails(i) {
  
    if(this.details[i]==true){
      this.details[i]=false;
      this.buttonInfo[i] = "Show Details";
    }else{
      this.details[i]=true;
      this.buttonInfo[i] = "Hidden Details";
    }
  }

  //playlistN_userN aa0b  aa: playlistN b: userN
  checksonginplaylist(playlistN, userN){
    var playlistN_userN = playlistN+"0"+userN;
    console.log("playlistN_userN"+playlistN_userN);
    this.playlistService.searchSonginplaylist(playlistN_userN).subscribe(
      res => {

        this.songinPlaylist = res;
      },
      err => { 
        console.log(err);
        
      });
  };

    //playlistN_userN aa0b  aa: playlistN b: userN

    addPlaylist(creater,playlist){
      
        this.playlistService.addasmyplaylist({ createrN:creater, playlistN:playlist, userN:this.userDetails.email }).subscribe(
          res => {
            this.result = res;
          },
          err => { 
            console.log(err);
            
          });
    }
    
  

}
