import {Component, OnInit} from '@angular/core';
import {ContactService} from "../services/contact.service";
import {Contact} from "../models/Contact";
import {Mode, SharedService} from "../services/shared.service";

@Component({
  selector: "app-view-contact",
  providers: [SharedService],
  templateUrl: "./view-contact.component.html",
  styleUrls: ["./view-contact.component.scss"]
})
export class ViewContactComponent implements OnInit {

  /** @var list property an array of Contact type **/
  private contacts: Contact[];

  constructor(private contactService : ContactService, private sharedService : SharedService) { }

  ngOnInit() {
    // Load all contacts on init
    this.loadContacts();
    this.sharedService.mode = Mode.create;
    this.sharedService.newContact = {
      "name": "",
      "gender": "",
      "email": "",
      "phoneNumber": ""
    };
  }

  /**
   * Get all contacts from server and update the list
   */
  public loadContacts() {
    this.contactService.getAllContacts().subscribe(
        response => this.contacts = response
    );
  }

  public updateContact(contact) {
    this.sharedService.mode = Mode.update;
    this.sharedService.newContact = contact;
  }

  /**
   * Delete a specific newContact. The deleted newContact is being filtered out with .filter method.
   * @param contact
   */
  public deleteContact(contact : Contact) {
    this.contactService.deleteContact(contact._id).subscribe(
        () => this.contacts = this.contacts.filter(lists => lists !==  contact)
      )
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
    this.loadContacts();
  }
}
