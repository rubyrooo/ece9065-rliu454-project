// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'ng4-social-login';

const config = new AuthServiceConfig([
{
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider('793080839530-sdr0nj1r4vn2ukhff08combdn0joq27m.apps.googleusercontent.com')
}
],false );

export function provideConfig(){
  return config;
}
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';


//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';

//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomepageComponent } from './homepage/homepage.component';
import { LatestComponent } from './latest/latest.component';
import { NewsongComponent } from './user-profile/newsong/newsong.component';
import { NewplaylistComponent } from './user-profile/newplaylist/newplaylist.component';
import { PlaylistComponent } from './shared/playlist/playlist.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    HomepageComponent,
    LatestComponent,
    NewsongComponent,
    NewplaylistComponent,
    PlaylistComponent
   

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true},
    {provide: AuthServiceConfig,
    useFactory: provideConfig
    },

    AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }