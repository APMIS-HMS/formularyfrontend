import { NgModule, NgZone } from '@angular/core';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { systemModulesRoutes } from './system-modules.routes';
import { SystemModulesComponent } from './system-modules.component';
import { ProductService } from '../services/product.service';
import { ProductTypeService } from '../services/product-type.service';
import { RXNConsoService } from '../services/rxnconso.service';
import { IngredientService } from '../services/ingredient.service';
import { ManufacturerService } from '../services/manufacturer.service';
import { FrequencyService } from '../services/frequency.service';

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
  providers: [ ProductService, ProductTypeService, RXNConsoService, IngredientService, ManufacturerService, FrequencyService ]
})
export class SystemModule { }
