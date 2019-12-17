import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm} from '@angular/forms';
import { environment } from '../../environments/environment';
import { User } from './user.model';

import { User_Status } from './user_status.model';
import { User_Active } from './user_active.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    method: 'local'
  };
  user_status_model: User_Status = {
    email: '',
    admin: false
  };


  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }
   //Http Methods
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  postGoogleUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/googleregister',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  //Helper Methods
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  getAllUser(){
    return this.http.get(environment.apiBaseUrl+'/admin/users');
  }

  //update user status
  updateUserStatus(user_status: User_Status){
    return this.http.post(environment.apiBaseUrl+ '/admin/userstatus/update', user_status);
  }
  //update user activation status
  updateUserActive(User_Active: User_Active){
    return this.http.post(environment.apiBaseUrl+ '/admin/useractive/update', User_Active);
  }
  resend(form:NgForm){
    return this.http.post(environment.apiBaseUrl+ '/open/resend', form,this.noAuthHeader);
  }

}
