import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewContactComponent } from './view-contact/view-contact.component';

const routes: Routes = [
  { path: "contact-book", component: ViewContactComponent },
  { path: "", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
