import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { PlaylistService } from '../shared/playlist.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  userDetails;
  Admin;
  constructor(private playlistService: PlaylistService,private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.Admin = this.userDetails.admin;
        console.log("PPPP"+ this.userDetails.email);
        console.log("QQQQ"+  this.userDetails.admin );
        
    
      },
      err => { 
        console.log("something wrong")
      }
  
    )};


  onLogout(){
      this.userService.deleteToken();
      this.router.navigate(['/login']);
  }

}
