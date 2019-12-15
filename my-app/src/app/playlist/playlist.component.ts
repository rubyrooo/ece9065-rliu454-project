import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { PlaylistService } from '../shared/playlist.service';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';

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

  constructor(private playlistService: PlaylistService, private router: Router, public appComponent: AppComponent) { }
  ngOnInit() {
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
    addList(playlistN, userN){
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
  




}
