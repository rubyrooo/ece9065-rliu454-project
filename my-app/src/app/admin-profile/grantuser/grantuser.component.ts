import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import {User_Status} from '../../shared/user_status.model';
import {User_Active} from '../../shared/user_active.model';

@Component({
  selector: 'app-grantuser',
  templateUrl: './grantuser.component.html',
  styleUrls: ['./grantuser.component.scss']
})
export class GrantuserComponent implements OnInit {
  userList;
  showSucessMessage;
  User_Status = new User_Status; 
  User_Active = new User_Active; 
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(
      res => {
        this.userList = res;
      },
      err => { 
        console.log(err);
        
      });
  }
  Changeadminstatus(i){
    this.User_Status.email = this.userList[i].email; 
    this.User_Status.admin = document.getElementById('admin')["value"];

    console.log("A",this.User_Status.email);
    console.log("B",this.User_Status.admin);

    this.userService.updateUserStatus(this.User_Status).subscribe( 
        res => {
          this.showSucessMessage = "Create Successfully";
        
        },
        err => {
          console.log(err.error.message);
        })
  }

  Changeactivestatus(i){
    this.User_Active.email = this.userList[i].email; 
    this.User_Active.active = document.getElementById('active')["value"];


    this.userService.updateUserActive(this.User_Active).subscribe( 
        res => {
          this.showSucessMessage = "Create Successfully";
        
        },
        err => {
          console.log(err.error.message);
        })
  }



}
