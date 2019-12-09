import { Component, OnInit } from '@angular/core';
import { LatestService } from '../shared/latest.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {
  topList;
  constructor( private latestService: LatestService, private router: Router) { }

  ngOnInit() {
    this.latestService.getTopTen().subscribe(
      res => {
        
        this.topList = res;

      },
      err => { 
        console.log(err);
        
      }
    );
    
  }

}
