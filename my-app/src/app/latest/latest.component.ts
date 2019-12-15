import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { LatestService } from '../shared/latest.service';
import { PlaylistService } from '../shared/playlist.service';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {
  topList;
  songList;
  reviewList;
  details = new Array;
  buttonInfo =new Array;
  login;
  userDetails;
  result;
 

  constructor( private userService: UserService, private latestService: LatestService,private playlistService: PlaylistService, private router: Router, public appComponent: AppComponent) { }

  ngOnInit() {
    this.latestService.getTopTen().subscribe(
      res => {
        
        this.topList = res;
        console.log("Here");
        console.log(res);

      },
      err => { 
        console.log(err);
        
      }); 

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

  //search song result
  onSubmit(form: NgForm) {
    this.latestService.searchSong(form.value.id).subscribe(
      res => {
        this.songList = res;
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

  checkreview(songTitle){
    this.latestService.searchReview(songTitle).subscribe(
      res => {

        this.reviewList = res;
      
      },
      err => { 
        console.log(err);
        
      });
  };

  writereview(songTitle){

    //get current user profile
    //var user = this.appComponent.owner;
    var review = prompt("Please enter your reivew:", "Review...");
    var rating = prompt("Please enter your rating 1-5:", "Raing");
    if (review == null || rating == "") {
      review = prompt("Please enter your reivew:", "Review...");
      rating = prompt("Please enter your rating 1-5:", "Raing");
    } else {

      this.latestService.writeReview({songN:songTitle, reviewerN: this.userDetails.email, rating:rating,reviewC:review }).subscribe(
        res => {
          console.log("writeReview successed");
 
        },
        err => { 
          console.log(err);
          
        });
       }

  }




  addList(songTitle){
    var playlist = prompt("Please enter the playlist you want to add into:", "Playlist Name...");
    console.log("playlist",playlist);
    this.playlistService.postUserplaylist({ playlistN:playlist, userN:this.userDetails.email, songN:songTitle }).subscribe(
      res => {
        this.result = res;
      },
      err => { 
        console.log(err);
        
      });
  }
}

