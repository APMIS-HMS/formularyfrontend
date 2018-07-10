import { Routes, RouterModule } from '@angular/router';
import { SystemModulesComponent } from './system-modules.component';
import { ListProductsComponent } from './list-products/list-products.component';
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
