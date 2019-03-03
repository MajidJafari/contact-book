import { Injectable } from "@angular/core";
import {Contact} from "../models/Contact";

@Injectable({
  providedIn: "root"
})
export class SharedService {
  constructor() {}

  mode: Mode;
  newContact: Contact;
}


export enum Mode {
  create = "add",
  update = "edit"
}
