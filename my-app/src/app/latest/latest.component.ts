import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { LatestService } from '../shared/latest.service';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';
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
  buttonInfo;
  constructor( private latestService: LatestService, private router: Router, public appComponent: AppComponent) { }

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
  }

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
        this.buttonInfo = "Show Details";
      }else{
        this.details[i]=true;
        this.buttonInfo = "Hidden Details";
      }
  }

  checkreview(songTitle){
    this.latestService.searchReview(songTitle).subscribe(
      res => {

        this.reviewList = res;
        console.log(this.reviewList);
      },
      err => { 
        console.log(err);
        
      });
  };
  writereview(songTitle){
    var user = this.appComponent.owner;
    console.log("!!"+this.appComponent.owner);
    var review = prompt("Please enter your reivew:", "Review...");
    var rating = prompt("Please enter your rating 1-5:", "Raing");
    if (review == null || rating == "") {
      review = prompt("Please enter your reivew:", "Review...");
      rating = prompt("Please enter your rating 1-5:", "Raing");
    } else {

      this.latestService.writeReview({songN:songTitle, reviewerN:user, rating:rating,reviewC:review }).subscribe(
        res => {
      
          
 
        },
        err => { 
          console.log(err);
          
        });
       }

  }

}
