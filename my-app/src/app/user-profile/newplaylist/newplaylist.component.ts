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
  constructor(private playlistService: PlaylistService,private appComponent: AppComponent) { }

  ngOnInit() {
  }

  onSubmit(){
    var addplaylistN = document.getElementById('playlistN')["value"];
    var addstatus = document.getElementById('status')["value"];
    var adddescription = document.getElementById('description')["value"];


    this.playlistService.postPlaylist( {playlistN: addplaylistN, status:addstatus, description: adddescription, userN:this.appComponent.owner }).subscribe(      
      res => {
      this.serverSuccessMessages = "Create Successfully";
      this.resetForm();

    },
    err => {
      this.serverErrorMessages = err.error.message;
    }


    )}

  resetForm() {
    this.playlistService.model = {
      playlistN:  '',
      status: '',
      description: '',
      userN: ''
    };

  }
}
