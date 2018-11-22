import { environment } from './../environments/environment';
import { StrengthUnitsService } from './services/strength-units.service';
import { DoseFormsService } from './services/dose-forms.service';
import { SocketService, RestService } from './feathers/feathers.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { BrandService, SystemModuleService, UserService } from './services';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ScdService } from './services/scd.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OnlyMaterialModule } from './shared-modules/only-material-module';


@NgModule({
	declarations: [ AppComponent ],
	imports: [
		ROUTES,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		OnlyMaterialModule,
		BrowserAnimationsModule,
		StoreModule.forRoot({}),
		StoreDevtoolsModule.instrument({
			name: 'APMIS formulary',
			maxAge: 25,
			logOnly: environment.production
		}),
		EffectsModule.forRoot([])
	],
	providers: [
		BrandService,
		SocketService,
		RestService,
		SystemModuleService,
		UserService,
		DoseFormsService,
		StrengthUnitsService,
		ScdService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
