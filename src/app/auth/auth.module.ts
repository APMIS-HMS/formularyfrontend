import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { AuthComponent } from './auth.component';
import { ROUTES } from './auth.routes';
import { AuthLandingComponent } from './auth-landing/auth-landing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ROUTES
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent,
    AuthLandingComponent
  ],
  providers: [ ]
})
export class AuthModule { }
