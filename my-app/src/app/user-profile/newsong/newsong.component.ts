import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { LatestService } from '../../shared/latest.service';

import { SongService } from '../../shared/song.service';

@Component({
  selector: 'app-newsong',
  templateUrl: './newsong.component.html',
  styleUrls: ['./newsong.component.scss']
})
export class NewsongComponent implements OnInit {

  constructor(private latestService: LatestService,private songService: SongService,private appComponent: AppComponent) { }

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

    if(addtitle==""){
      this.serverErrorMessages="Title should not be empty"
      return false;
    }else if(addartist==""){
      this.serverErrorMessages="Artist should not be empty"
      return false;
    }else{


    this.songService.postSong( {header: addheader,title:addtitle, artist: addartist, alblum:addalblum, year:addyear,comment: addcomment,reserve: addreserve, track:addtrack, genre:addgenre, addN:this.appComponent.owner }).subscribe(      
      res => {
      /* console.log("THERE"+this.appComponent.owner) //get user email  */
      
      
    //----------------------- start create review -----------------------
    var review = prompt("Please enter your reivew:", "Review...");
    var rating = prompt("Please enter your rating 1-5:", "Raing");
    if (review == null ) {
      review = prompt("Review cannot be blank:", "Review...");
      
    } else if(Number(rating)>5 || Number(rating)<1 ){
      rating = prompt("Rating should in range 1-5:", "Raing...");
    }

    this.latestService.writeReview({songN:addtitle, reviewerN: this.appComponent.owner, rating:rating,reviewC:review }).subscribe(
      res => {
        console.log("Write Review successed");

      },
      err => { 
        console.log(err);
        
      });
    //----------------------- end create review -----------------------

      this.serverSuccessMessages = "Create Successfully";
      this.resetForm();

    },
    err => {
      this.serverErrorMessages = err.error.message;
    }


    )}}

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
