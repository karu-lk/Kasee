import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { SpecListComponent } from './spec/spec-list/spec-list.component';
import { SpecDetailsComponent } from './spec/spec-details/spec-details.component';
import { SpecVersionComponent } from './spec/spec-version/spec-version.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'customer-details', component: CustomerDetailsComponent },
    { path: 'customer-list', component: CustomerListComponent },
    { path: 'spec-list', component: SpecListComponent },
    { path: 'spec-details', component: SpecDetailsComponent },
    { path: 'spec-version', component: SpecVersionComponent },
    { path: 'login', component: LoginComponent },
    { path: 'order', component: OrderComponent },
    { path: 'coming-soon', component: ComingSoonComponent },
    { path: 'user-verification', component: UserVerificationComponent },
    { path: '**', component: HomeComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);