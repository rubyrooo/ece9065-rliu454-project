import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from 'src/app/shared/user.model';
import { UserService } from '../../shared/user.service';
import { SocialUser, AuthService, GoogleLoginProvider } from 'ng4-social-login';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  // google signin
  title = 'app';
  public user: any = SocialUser;
  googleuser = new User;
  googleuser_1 = new User;



  googlelogin(){
    this.SocialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) =>{
      this.user = userData;
      this.googleuser.email = this.user.email;
      this.googleuser.fullName = this.user.name;
      this.googleuser.password = '1111';
      this.userService.postGoogleUser(this.googleuser).subscribe(
        res => {
        },
        err => {
          this.serverErrorMessages = err.error.message;
        }
      );


      this.googleuser_1.email = this.user.email;
      this.googleuser_1.password = '1111';
      this.userService.login(this.googleuser_1).subscribe(
        res => {
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/homepage');
        },
        err => {
          this.serverErrorMessages = err.error.message;
        }
      );





    })
  }
  constructor(private userService: UserService,private router : Router,private SocialAuthService: AuthService) { }

  model ={
    email :'',
    password:''
  }; 
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/homepage');
  }

  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        console.log("WHAT IS THIS",this.userService.setToken(res['token']));
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/homepage');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    )
  }

  ReSend(form:NgForm){
    this.userService.resend(form.value).subscribe(
      res=>{this.serverErrorMessages="Email Sended"
    },
      err =>{

    }
    )
  }

}
