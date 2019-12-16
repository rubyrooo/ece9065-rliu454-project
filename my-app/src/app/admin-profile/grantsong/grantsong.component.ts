import { Component, OnInit } from '@angular/core';
import { SongService } from '../../shared/song.service';
import {Song_Status} from '../../shared/song_status.model';

@Component({
  selector: 'app-grantsong',
  templateUrl: './grantsong.component.html',
  styleUrls: ['./grantsong.component.scss']
})
export class GrantsongComponent implements OnInit {
  songList;
  showSucessMessage;
  Song_Status = new Song_Status; 
  constructor(private songService: SongService) { }

  ngOnInit() {
    this.songService.getAllSong().subscribe(
      res => {
        this.songList = res;
    
      },
      err => { 
        console.log(err);
        
      });
  }

  Changestatus(i){
    this.Song_Status.title = this.songList[i].title; ;
    this.Song_Status.hidden = document.getElementById('hidden')["value"];

    console.log("A",this.Song_Status.title);
    console.log("B",this.Song_Status.hidden);

    this.songService.updateSongStatus(this.Song_Status).subscribe( 
        res => {
          this.showSucessMessage = "Create Successfully";
        
        },
        err => {
          console.log(err.error.message);
        })
  } 

}
