import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { LatestService } from '../shared/latest.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {
  topList;
  songList;
  constructor( private latestService: LatestService, private router: Router) { }

  ngOnInit() {
    this.latestService.getTopTen().subscribe(
      res => {
        
        this.topList = res;

      },
      err => { 
        console.log(err);
        
      });  
  }

  onSubmit(form: NgForm) {
    this.latestService.searchSong(form.value.id).subscribe(
      res => {
  
        this.songList = res;
        console.log("Here");
        console.log(res);
        for(var i = 0; i<this.songList.length; i++){
          var div = document.createElement("div");
          var br = document.createElement("br");

          var node = document.createTextNode('Header: ' + this.songList[i].header+ '  Title: ' +this.songList[i].title+ '  Artist: ' +this.songList[i].artist+ '  Alblum: ' +this.songList[i].alblum + '  Year: ' +this.songList[i].year + '  Comment: ' +this.songList[i].comment+ '  Adding Time: ' +this.songList[i].addT)
          div.appendChild(br);
          div.appendChild(node);
          document.getElementById("li").appendChild(div);
        }

      },
      err => { 
        console.log(err);
        
      });
  }

}
