import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
// import { SwitchUserResolverService } from './resolvers/module-menu/index';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const appRoutes: Routes = [
  {
    path: 'modules',
    loadChildren: './system-modules/system-modules.module#SystemModule',
    data: { preload: true }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

// export default RouterModule.forRoot(appRoutes);
// export const Routing = RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: CustomPreloading });
export const ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
