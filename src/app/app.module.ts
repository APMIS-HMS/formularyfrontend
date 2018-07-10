import { BrandService } from './services/brand.service';
import { SocketService, RestService } from './feathers/feathers.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ROUTES,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BrandService, SocketService, RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
