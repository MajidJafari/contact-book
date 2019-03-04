const express = require("express");
const router = express.Router();
const contactBook = require("../models/contact");

router.get("/", (req, res) => {
    const nameString = req.query.search;
    const start = req.query.start || "0";
    let display = req.query.display || "100";
    let sortBy = req.query.sort || "name";
    let sortMode = req.query.mode || "asc";

    // If user searches for specific names, returns them
    if(nameString) {
        contactBook.searchByName(nameString, Number(start), Number(display), sortBy, sortMode, (err, contacts) => {
            if(err) {
                res.json({success: false, message: `Failed to fetch contacts - Error: ${err}`})
            }
            else {
                res.json({success: true, contacts: contacts});
            }
        });
    }
    // Else if user doesn't search for specific names, return all of the contacts
    else {
        contactBook.getAllContacts(Number(start), Number(display), sortBy, sortMode, (err, contacts) => {
            if(err) {
                res.json({success: false, message: `Failed to load all contacts - Error: ${err}`})
            }
            else {
                res.json({success: true, contacts: contacts});
            }
        });
    }
});

router.post("/", (req, res) => {
   let newContact = new contactBook({
       name: req.body.name,
       gender: req.body.gender,
       email: req.body.email,
       phoneNumber: req.body.phoneNumber
   });
   contactBook.addContact(newContact, (err, contact) => {
      if(err) {
         res.json({success: false, message: `Failed to create a new contact - Error: ${err}`});
      }
      else {
         res.json({success: true, message: "Added successfully"});
      }
   });
});

router.put("/:id", (req, res) => {
    let id = req.params.id.substring(1);
    let updatedContact = new contactBook({
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    });
   contactBook.updateContactById(id, updatedContact, (err, contact) => {
      if (err) {
          res.json({success: false, message: `Failed to update the contact - Error: ${err}`});
      }
      else {
          res.json({success: true, message: "Updated successfully"});
      }
    });
});

router.delete("/:id", (req, res) => {
      //access the parameter which is the id of the item to be deleted
      let id = req.params.id.substring(1);

      // access the parameter which is the id of the item to be deleted
      contactBook.deleteContactById(id, (err, contact) => {
         if(err) {
            res.json({success: false, message: `Failed to delete the contact - Error: ${err}`})
         }
         else if (contact) {
            res.json({success: true, message: "Deleted successfully"});
         }
         else {
            res.json({success: false});
         }
      });
});

module.exports = router;
