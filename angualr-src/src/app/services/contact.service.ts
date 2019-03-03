import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "../models/Contact";
import { map } from "rxjs/operators";

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) {}

  private serverApi = "http://localhost:3000/contact-book/";

  public getAllContacts() : Observable<Contact[]> {
    return this.http.get(this.serverApi)
      .pipe(
        map(res => <Contact[]>res["contacts"])
      )
  }

  public getContacts(queryParams) : Observable<Contact[]> {
    let url = this.serverApi + queryParams;
    return this.http.get(url)
      .pipe(
        map(res => <Contact[]>res["contacts"])
      )
  }

  public deleteContact(contactId : string) {
    let url = `${this.serverApi}.${contactId}`;
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.http.delete(url, {headers})
      .pipe(
        map((res : Response) => res.json)
      )
  }

  public addContact(contact : Contact) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    let body = JSON.stringify({
      name : contact.name,
      gender: contact.gender,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
    });
    console.log("body: ", body);

    return this.http.post(this.serverApi, body,{headers})
      .pipe(
        map((res : Response) => res.json)
      );
  }

  public updateContact(contact : Contact) {
    let url = `${this.serverApi}.${contact._id}`;
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    let body = JSON.stringify({
      name : contact.name,
      gender: contact.gender,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
    });

    return this.http.put(url, body,{headers})
      .pipe(
        map((res : Response) => res.json)
      );
  }

  public searchForContact(nameString : string) : Observable<Contact[]> {
    let url = `${this.serverApi}?search=${nameString}`;
    return this.http.get(url)
      .pipe(
        map(res => <Contact[]>res["contacts"])
      )
  }
}