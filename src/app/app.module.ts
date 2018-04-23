import { BrandService } from './services/brand.service';
import { SocketService, RestService } from './feathers/feathers.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductService } from './services/product.service';
import { ProductTypeService } from './services/product-type.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, ProductTypeService, BrandService, SocketService, RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
