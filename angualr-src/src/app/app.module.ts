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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { MatButtonModule, MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatIconModule } from '@angular/material';

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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule
  ],
  // All the services go here
  providers: [ContactService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
