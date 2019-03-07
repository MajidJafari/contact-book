import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthenticationService, private router : Router, private app : AppComponent) {}

  private error = "";
  private username : string;
  private password : string;
  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      res => {
        if (res["success"] === true) {
          this.app.isLoggedIn = true;
          this.router.navigate(["/contact-book"]);
        }
        else {
          this.error = res["message"];
        }
      }
    );
  }

}
