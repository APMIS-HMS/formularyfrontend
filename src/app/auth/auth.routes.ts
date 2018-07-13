import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { AuthComponent } from './auth.component';
import { AuthLandingComponent } from './auth-landing/auth-landing.component';

const appRoutes: Routes = [
  {path: '', component : AuthComponent,
    children : [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: '',
        component: AuthLandingComponent
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      }
    ]
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(appRoutes)],
//   exports: [RouterModule]
// })
// export class AuthRoutingModule { }
export const ROUTES = RouterModule.forChild(appRoutes);
