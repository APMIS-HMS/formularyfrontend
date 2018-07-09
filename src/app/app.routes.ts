import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
// import { SwitchUserResolverService } from './resolvers/module-menu/index';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'modules',
    loadChildren: './system-modules/system-modules.module#SystemModule',
    data: { preload: true }
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    data: { preload: true }
  },
  {
    path: '', redirectTo: 'auth', pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

// export default RouterModule.forRoot(appRoutes);
// export const Routing = RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: CustomPreloading });
export const ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
