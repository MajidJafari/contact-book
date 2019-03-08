import {Component, OnInit} from '@angular/core';
import {ContactService} from "../services/contact.service";
import {Contact} from "../models/Contact";
import {Mode, SharedService} from "../services/shared.service";
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: "app-view-contact",
  providers: [SharedService],
  templateUrl: "./view-contact.component.html",
  styleUrls: ["./view-contact.component.scss"]
})
export class ViewContactComponent implements OnInit {


  private contacts: Contact[];  /** @var list property an array of Contact type **/
  private nameString = "";
  private display;
  private currentPage;
  private pages;
  private sortBy;
  private sortMode;
  constructor(private contactService: ContactService, private sharedService: SharedService, private app: AppComponent, private router: Router) {
    this.currentPage = 1;
    this.display = 3;
    this.sortBy = "name";
    this.sortMode = "asc";
  }

  ngOnInit() {
    if (!this.app.isLoggedIn) {
      this.router.navigate(["/"]);
    }
    // Load all contacts on init
    this.loadAllContacts();
    this.sharedService.newContact = {
      "name": "",
      "gender": "",
      "email": "",
      "phoneNumber": ""
    };
  }

  /**
   * Get contacts from server and update the list
   */
  public loadAllContacts() {
    this.contactService.getAllContacts().subscribe(
        res => {
          this.setPages(res);
          this.loadContacts(1);
        }
    );
  }

  public loadContacts(page) {
    this.currentPage = page;
    const queryParams = `?start=
      ${this.display * (this.currentPage - 1)}&display=${this.display}&search=${this.nameString}&sort=${this.sortBy}&mode=${this.sortMode}`;
    this.contactService.getContacts(queryParams).subscribe(
      res => this.contacts = res
    );
  }

  public updateContact(contact) {
    this.sharedService.mode = Mode.update;
    this.sharedService.newContact = contact;
    this.sharedService.errors = {};
    this.sharedService.submitted = false;
  }

  /**
   * Delete a specific newContact. The deleted newContact is being filtered out with .filter method.
   * @param contact
   */
  public deleteContact(contact : Contact) {
    this.contactService.deleteContact(contact._id).subscribe(
        () => this.contacts = this.contacts.filter(contacts => contacts !==  contact)
    );
  }

  /**
   * Add the new list defined by the user to the view
   * @param contact
   */
  public onAddContacts(contact) {
    this.contacts = this.contacts.concat(contact);
  }

  /**
   * Add the new list defined by the user to the view
   * @param contact
   */
  public onUpdateContacts(contact) {
    this.loadAllContacts();
  }

  public onSearchSubmit() {
    this.currentPage = 1;
    this.contactService.searchForContact(this.nameString).subscribe(
      res => {
        this.setPages(res);
        this.loadContacts(1);
      }
    );
  }

  setPages(res) {
    this.pages = Array.apply(null, {length: Math.ceil(res.length / this.display)}).map(Number.call, Number);
  }

  public toggleSortCriteria(sortBy) {
    if (this.sortBy === sortBy) {
      this.toggleSortMode();
    }

    this.sortBy = sortBy;
    this.loadContacts(this.currentPage);
  }

  private toggleSortMode() {
    if (this.sortMode === "asc") {
      this.sortMode = "desc";
    }
    else if (this.sortMode === "desc") {
      this.sortMode = "asc";
    }
  }

  public onCreateContact() {
    this.sharedService.submitted = false;
    this.sharedService.mode = Mode.create;
    this.sharedService.newContact = {
      name: "",
      gender: "",
      email: "",
      phoneNumber: ""
    };
  }
}
