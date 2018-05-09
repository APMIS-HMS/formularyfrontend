import { BrandService } from './services/brand.service';
import { SocketService, RestService } from './feathers/feathers.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';
import { ProductTypeService } from './services/product-type.service';
import { IngredientService } from './services/ingredient.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, ProductTypeService, BrandService, IngredientService, SocketService, RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
