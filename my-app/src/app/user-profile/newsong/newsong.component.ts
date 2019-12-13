import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { UserProfileComponent } from '../user-profile.component';

import { SongService } from '../../shared/song.service';

@Component({
  selector: 'app-newsong',
  templateUrl: './newsong.component.html',
  styleUrls: ['./newsong.component.scss']
})
export class NewsongComponent implements OnInit {

  constructor(private songService: SongService,private appComponent: AppComponent) { }

  ngOnInit() {

  }
  serverSuccessMessages: String;
  serverErrorMessages: String;
  


  onSubmit(){
    var addheader = document.getElementById('header')["value"];
    var addtitle = document.getElementById('title')["value"];
    var addartist = document.getElementById('artist')["value"];
    var addalblum = document.getElementById('alblum')["value"];
    var addyear = document.getElementById('year')["value"];
    var addcomment = document.getElementById('comment')["value"];
    var addreserve = document.getElementById('reserve')["value"];
    var addtrack = document.getElementById('track')["value"];
    var addgenre = document.getElementById('genre')["value"];

    console.log("addheader"+addheader) //get user email 

    this.songService.postSong( {header: addheader,title:addtitle, artist: addartist, alblum:addalblum, year:addyear,comment: addcomment,reserve: addreserve, track:addtrack, genre:addgenre, addN:this.appComponent.owner }).subscribe(      
      res => {
      console.log("THERE"+this.appComponent.owner) //get user email 

      this.serverSuccessMessages = "Create Successfully";
      this.resetForm();

    },
    err => {
      this.serverErrorMessages = err.error.message;
    }


    )}

  resetForm() {
    this.songService.model = {
      header:  '',
      title: '',
      artist: '',
      alblum: '',
      year:  '',
      comment: '', 
      reserve: '',
      track: '',
      genre: '',
      addN: ''
    };

    
  }

}
