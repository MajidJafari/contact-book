import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  private serverApi = "http://localhost:3000/";
  private headers = {headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};

  public login (username : string, password : string) {
    const body = {
      username,
      password
    };
    return this.http.post(this.serverApi, body, this.headers)
    .pipe(
      map((res : Response) => res)
    );
  }

  public isLoggedIn() {
    return this.http.get(this.serverApi)
    .pipe(
      map((res : Response) => res)
    );
  }
}
