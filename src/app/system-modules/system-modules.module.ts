import { NgModule, NgZone } from '@angular/core';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { systemModulesRoutes } from './system-modules.routes';
import { SystemModulesComponent } from './system-modules.component';
import {
  ProductService, ProductTypeService, RXNConsoService, IngredientService, ManufacturerService,
  FrequencyService, BrandedProductService } from '../services/index';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ScdComponent } from './scd/scd.component';
import { AddScdComponent } from './scd/add-scd/add-scd.component';

@NgModule({
  declarations: [
  SystemModulesComponent,
  ListProductsComponent,
  AddProductComponent,
  PageNotFoundComponent,
  ScdComponent,
  AddScdComponent
],
  exports: [
  ],
  imports: [
    systemModulesRoutes,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [ ProductService, ProductTypeService, RXNConsoService, IngredientService, ManufacturerService,
    FrequencyService, BrandedProductService ]
})
export class SystemModule { }
