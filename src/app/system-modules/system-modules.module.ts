import { NgModule, NgZone } from '@angular/core';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { systemModulesRoutes } from './system-modules.routes';
import { SystemModulesComponent } from './system-modules.component';
import { ProductService } from '../services/product.service';
import { ProductTypeService } from '../services/product-type.service';

@NgModule({
  declarations: [
  SystemModulesComponent,
  ListProductsComponent,
  AddProductComponent],
  exports: [
  ],
  imports: [
    systemModulesRoutes,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [ ProductService, ProductTypeService ]
})
export class SystemModule { }
