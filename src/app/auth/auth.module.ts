import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLandingComponent } from './auth-landing/auth-landing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent,
    AuthLandingComponent
  ]
})
export class AuthModule { }
