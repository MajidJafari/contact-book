import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {Contact} from "../models/Contact";
import {ContactService} from "../services/contact.service";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.scss"]
})
export class AddContactComponent implements OnInit {

  public genders = [
    { value: "Male", display: "Man" },
    { value: "Female", display: "Woman" }
  ];

  private newContact : Contact;
  @Output() addContact : EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor(private contactService : ContactService) { }

  ngOnInit() {
    this.newContact = {
      name: "",
      gender: "",
      email: "",
      phoneNumber: "",
      _id: ""
    }
  }

  public onSubmit() {
    this.contactService.addContact(this.newContact).subscribe(
      res => {
        if (res["success"] == true) {
          // Update the view-contact component
          this.addContact.emit(this.newContact);
        }
      }
    )
  }
}
