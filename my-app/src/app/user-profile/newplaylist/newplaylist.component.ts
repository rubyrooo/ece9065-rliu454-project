import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { PlaylistService } from '../../shared/playlist.service';

@Component({
  selector: 'app-newplaylist',
  templateUrl: './newplaylist.component.html',
  styleUrls: ['./newplaylist.component.scss']
})
export class NewplaylistComponent implements OnInit {
  serverSuccessMessages: String;
  serverErrorMessages: String;
  playlistN_userN_songN: String;
  constructor(private playlistService: PlaylistService,private appComponent: AppComponent) { }

  ngOnInit() {
  }

  onSubmit(){
    var addplaylistN = document.getElementById('playlistN')["value"];
    var addstatus = document.getElementById('status')["value"];
    var adddescription = document.getElementById('description')["value"];

    this.playlistN_userN_songN = addplaylistN+"0"+this.appComponent.owner;
    console.log("playlistN_userN_songN"+this.playlistN_userN_songN);

    this.appComponent.owner

    this.playlistService.postPlaylist( {playlistN: addplaylistN, status:addstatus, description: adddescription, userN:this.appComponent.owner,songList:[]}).subscribe(      
      res => {
      this.serverSuccessMessages = "Create Successfully";
      this.resetForm();

    },
    err => {
      this.serverErrorMessages = err.error.message;
    })
  


  
  }

  resetForm() {
    this.playlistService.model = {
      playlistN:  '',
      status: '',
      description: '',
      userN: '',
      songList: []
    };

  }
}
