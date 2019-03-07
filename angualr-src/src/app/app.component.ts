import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Contact Book Application";
  private _isLoggedIn = false;

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  get isLoggedIn() : boolean {
    return this._isLoggedIn;
  }
}
