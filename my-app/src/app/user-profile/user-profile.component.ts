import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  constructor(private userService: UserService, private router: Router, public appComponent: AppComponent) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
      
        this.userDetails = res['user'];
        this.appComponent.owner = this.userDetails.email;
        console.log("Where"+ this.appComponent.owner);
        
   
      },
      err => { 
        
        
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}