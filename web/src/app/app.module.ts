import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { OwlModule } from 'ngx-owl-carousel';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, } from "angular5-social-login";
import { HttpModule } from '@angular/http';

import { appRoutingProviders, routing } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { ShopComponent } from './shop/shop.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { UserProfileService } from './services/userProfile/user-profile.service';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("Your-Facebook-app-id")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("77874948548-e5551sdgksfbsaqsgnmlrsvlm08saebm.apps.googleusercontent.com")
      },
    ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewArrivalsComponent,
    ShopComponent,
    AboutUsComponent,
    LoginComponent,
    ComingSoonComponent,
    UserVerificationComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    RouterModule,
    routing,
    Angulartics2Module.forRoot([Angulartics2GoogleTagManager]),
    OwlModule,
    SocialLoginModule
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    UserProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
