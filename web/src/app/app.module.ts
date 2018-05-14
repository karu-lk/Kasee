import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { OwlModule } from 'ngx-owl-carousel';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, } from "angular5-social-login";
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRoutingProviders, routing } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { UserProfileService } from './services/userProfile/user-profile.service';
import { CustomerService } from './services/customer/customer.service';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { OrderComponent } from './order/order.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { SpecListComponent } from './spec/spec-list/spec-list.component';
import { SpecDetailsComponent } from './spec/spec-details/spec-details.component';

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
    LoginComponent,
    ComingSoonComponent,
    UserVerificationComponent,
    CustomerDetailsComponent,
    OrderComponent,
    CustomerListComponent,
    SpecListComponent,
    SpecDetailsComponent
  ],
  imports: [
    //HttpModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    routing,
    Angulartics2Module.forRoot([Angulartics2GoogleTagManager]),
    OwlModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    UserProfileService,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
