import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LatestComponent } from './latest/latest.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NewplaylistComponent } from './user-profile/newplaylist/newplaylist.component';
import { NewsongComponent } from './user-profile/newsong/newsong.component';

import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { GrantuserComponent } from './admin-profile/grantuser/grantuser.component';
import { GrantsongComponent } from './admin-profile/grantsong/grantsong.component';

import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    }, 
    {
        path: 'newsong', component: UserProfileComponent,
        children: [{ path: '', component: NewsongComponent }]
    },
    {
        path: 'newplaylist', component: UserProfileComponent,
        children: [{ path: '', component: NewplaylistComponent }]
    },
    {
        path: 'adminprofile', component: AdminProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'grantsong', component: AdminProfileComponent,
        children: [{ path: '', component: GrantsongComponent }]
    },
    {
        path: 'grantuser', component: AdminProfileComponent,
        children: [{ path: '', component: GrantuserComponent }]
    },
    {
        path: 'homepage', component: HomepageComponent
      
    },
    {
        path: 'latest', component: LatestComponent
    
    },
    {
        path: 'playlist', component: PlaylistComponent,canActivate:[AuthGuard]

    },
    {
        path: '', redirectTo: '/homepage', pathMatch: 'full'
    }

];