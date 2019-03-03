import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Contact} from "../models/Contact";
import {ContactService} from "../services/contact.service";
import {Mode, SharedService} from "../services/shared.service";

@Component({
  selector: "app-save-contact",
  templateUrl: "./save-contact.component.html",
  styleUrls: ["./save-contact.component.scss"]
})
export class SaveContactComponent implements OnInit {

  @Output() addContact : EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() updateContact : EventEmitter<Contact> = new EventEmitter<Contact>();

  private genders = [
    { value: "Male", display: "Man" },
    { value: "Female", display: "Woman" }
  ];

  constructor(private contactService : ContactService, private sharedService : SharedService) {}

  ngOnInit() {}

  public onSubmit() {
    let subject = this.contactService.addContact(this.sharedService.newContact);

    if (this.sharedService.mode === Mode.update) {
      subject = this.contactService.updateContact(this.sharedService.newContact);
    }

    subject.subscribe(
      res => {
        if (res["success"] == true) {
          // Update the view-newContact component
          if(this.sharedService.mode === Mode.create) {
            this.addContact.emit(this.sharedService.newContact);
          } else if (this.sharedService.mode == Mode.update) {
            this.updateContact.emit(this.sharedService.newContact);
          }
        }
      }
    )
  }
}
