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
<<<<<<< HEAD
import { IngredientService } from './services/ingredient.service';
=======
import { AddPageComponent } from './add-page/add-page.component';
>>>>>>> 5da520c2ddb66834b7e2feeddd27adc8ebd375a4


@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    HomePageComponent,
    AddPageComponent
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
