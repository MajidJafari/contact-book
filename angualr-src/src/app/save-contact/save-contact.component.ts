import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Contact} from "../models/Contact";
import {ContactService} from "../services/contact.service";
import {Mode, SharedService} from "../services/shared.service";
import { isObject } from 'util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-save-contact",
  templateUrl: "./save-contact.component.html",
  styleUrls: ["./save-contact.component.scss"]
})
export class SaveContactComponent implements OnInit {

  @Output() addContact : EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() updateContact : EventEmitter<Contact> = new EventEmitter<Contact>();

  private genders = [
    { value: "Male", display: "male" },
    { value: "Female", display: "female" }
  ];

  constructor(private contactService : ContactService, private sharedService : SharedService, private formBuilder: FormBuilder) {}

  private contactForm: FormGroup;
s
  ngOnInit() {
    this.sharedService.submitted = false;
    this.sharedService.newContact.gender = this.sharedService.newContact.gender || this.genders[0].value;

    this.contactForm = this.formBuilder.group({
      name: [this.sharedService.newContact.name, [Validators.required, Validators.pattern(new RegExp("^[a-zA-آ ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی ,.'-]{3,32}$", "i"))]],
      gender: [this.sharedService.newContact.gender, [Validators.required, Validators.pattern(new RegExp("female|male", "i"))]],
      email: [this.sharedService.newContact.email, Validators.email],
      phoneNumber: [this.sharedService.newContact.phoneNumber, [Validators.required, Validators.pattern("^0[0-9]{2,3}[0-9]{8}$|^(09|9)[013]([0-9]{1})[0-9]{7}$")]]
    });
  }

  public onSubmit() {
    console.log(this.f);
    this.sharedService.submitted = true;

    if(this.contactForm.invalid) {
      return;
    }

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
        else {
          const message = res["message"];
          if(isObject(message)) {
            this.sharedService.errors = {};
            Object.keys(message).forEach(field => {
              this.sharedService.errors[field] = message[field];
            });
          }
        }
      }
    )
  }

  // convenience getter for easy access to form fields
  get f() { return this.contactForm.controls; }
}
