import { SocketService, RestService } from './feathers/feathers.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';
import { ProductTypeService } from './services/product-type.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, ProductTypeService, SocketService, RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
