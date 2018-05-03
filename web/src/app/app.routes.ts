import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerViewComponent } from './customer/customer-view.component';
import { SpecComponent } from './spec/spec.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'customer-view', component: CustomerViewComponent },
    { path: 'spec', component: SpecComponent },
    { path: 'login', component: LoginComponent },
    { path: 'order', component: OrderComponent },
    { path: 'coming-soon', component: ComingSoonComponent },
    { path: 'user-verification', component: UserVerificationComponent },
    { path: '**', component: HomeComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);