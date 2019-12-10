import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserProfileComponent } from '../user-profile.component';

import { SongService } from '../../shared/song.service';

@Component({
  selector: 'app-newsong',
  templateUrl: './newsong.component.html',
  styleUrls: ['./newsong.component.scss']
})
export class NewsongComponent implements OnInit {

  constructor(private songService: SongService,private userprofileComponent: UserProfileComponent) { }

  ngOnInit() {
    console.log("THERE"+this.userprofileComponent)
  }
  serverSuccessMessages: String;
  serverErrorMessages: String;
  
  onSubmit(newsongForm : NgForm){
    this.songService.postSong(newsongForm.value).subscribe(
      res => {
        this.serverSuccessMessages = "Create Successfully";
        this.resetForm(newsongForm);

      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    )
  }

  resetForm(newsongForm: NgForm) {
    this.songService.model = {
      header:  '',
      title: '',
      artist: '',
      alblum: '',
      year:  '',
      comment: '', 
      reserve: '',
      track: '',
      genre: ''
    };
    newsongForm.resetForm();
    
  }

}
