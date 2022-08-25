import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../app.component';
import { ClientFormComponent } from '../pages/client-form/client-form.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClientComponent } from '../pages/client-form/client/client.component';
import { ClientAddressComponent } from '../pages/client-form/client-address/client-address.component';
import { IdentityComponent } from '../pages/client-form/identity/identity.component';
import { MaterialModule } from './material.module';
import { NgxMaskModule } from 'ngx-mask';
import { CreatedClientComponent } from '../pages/created-client/created-client.component';



@NgModule({
  declarations: [
    AppComponent,
    ClientFormComponent,
    ClientComponent,
    ClientAddressComponent,
    IdentityComponent,
    CreatedClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
