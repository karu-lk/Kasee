import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'new-arrivals', component: NewArrivalsComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'coming-soon', component: ComingSoonComponent },
    { path: 'user-verification', component: UserVerificationComponent },
    { path: '**', component: HomeComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);