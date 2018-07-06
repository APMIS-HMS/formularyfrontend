import { Routes, RouterModule } from '@angular/router';
import { SystemModulesComponent } from './system-modules.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { AddProductComponent } from './add-product/add-product.component';

const SYSTEMMODULES_ROUTES: Routes = [
  {
    path: '',
    component: SystemModulesComponent,
    children: [
      {
        path: 'products',
        component: ListProductsComponent
      },
      {
        path: 'search-product',
        component: SearchProductComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: '', redirectTo: 'products', pathMatch: 'full'
      },
    ]
  }
];

export const systemModulesRoutes = RouterModule.forChild(SYSTEMMODULES_ROUTES);
