import { SocketService, RestService } from './feathers/feathers.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { BrandService, SystemModuleService, UserService } from './services';


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
  providers: [BrandService, SocketService, RestService, SystemModuleService, UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
