import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import { UserProfileService } from '../services/userProfile/user-profile.service';
import * as moment from 'moment';
import { TokenType } from '@angular/compiler';
import { Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public newUser = { userId: '', userIdToken: '', userEmail: '', userPic: '', userFullName: '', authProvider: '', authToken: '', lastModifiedTime: moment() };

  constructor(private socialAuthService: AuthService, private userProfileService: UserProfileService, private router: Router) { }

  ngOnInit() { }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userProfile) => {
        this.newUser.userEmail = userProfile.email;
        this.newUser.userId = userProfile.id;
        this.newUser.userIdToken = userProfile.idToken;
        this.newUser.userPic = userProfile.image;
        this.newUser.userFullName = userProfile.name;
        this.newUser.authProvider = userProfile.provider;
        this.newUser.authToken = userProfile.token;
        this.newUser.lastModifiedTime = moment();
        // Now sign-in with userData

        let _self = this;
        this.userProfileService.createUser(this.newUser).then(function (result: Response) {
          console.log(`Successfully created a pending user ${JSON.stringify(result.json().userId)}`);

          if (result.status == 201) {
            _self.router.navigate(['/user-verification'], { queryParams: { "verificationToken": result.json().userId } });
          }
          else {
            this.router.navigate(['/home']);
          }
        });
      }
    )
  }

  localLogin() {
    this.router.navigate(['/coming-soon']);
  }
}