import { BrandService } from './services/brand.service';
import { SocketService, RestService } from './feathers/feathers.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ROUTES } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
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
