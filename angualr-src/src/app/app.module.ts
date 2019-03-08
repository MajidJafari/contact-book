import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { SaveContactComponent } from './save-contact/save-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { ContactService } from "./services/contact.service";
import { SharedService } from "./services/shared.service";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SaveContactComponent,
    ViewContactComponent,
    LoginComponent
  ],
  // Modules go here
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // All the services go here
  providers: [ContactService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
