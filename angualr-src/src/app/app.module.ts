import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { ContactService } from "./services/contact.service";

@NgModule({
  declarations: [
    AppComponent,
    AddContactComponent,
    ViewContactComponent
  ],
  //Modules go here
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  //All the services go here
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
