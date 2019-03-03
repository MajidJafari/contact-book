import { Component, OnInit } from '@angular/core';
import { ContactService } from "../services/contact.service";
import { Contact } from "../models/Contact";

@Component({
  selector: "app-view-contact",
  templateUrl: "./view-contact.component.html",
  styleUrls: ["./view-contact.component.scss"]
})
export class ViewContactComponent implements OnInit {

  /** @var list property an array of Contact type **/
  private contacts: Contact[];

  constructor(private contactService : ContactService) { }

  ngOnInit() {
    // Load all contacts on init
    this.loadContacts();
  }

  /**
   * Get all contacts from server and update the list
   */
  public loadContacts() {
    this.contactService.getAllContacts().subscribe(
        response => this.contacts = response
    );
  }

  /**
   * Delete a specific contact. The deleted contact is being filtered out with .filter method.
   * @param list
   */
  public deleteContact(list : Contact) {
    this.contactService.deleteContact(list._id).subscribe(
        () => this.contacts = this.contacts.filter(lists => lists !==  list)
      )
  }

  /**
   * Add the new list defined by the user to the view
   * @param newList
   */
  public onAddContacts(newList) {
    this.contacts = this.contacts.concat(newList);
  }
}
