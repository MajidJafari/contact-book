const express = require("express");
const router = express.Router();
const contactBook = require("../models/contact");

router.get("/", (req, res) => {
   contactBook.getAllContacts((err, contacts) => {
      if(err) {
         res.json({success: false, message: `Failed to load all contacts - Error: ${err}`})
      }
      else {
         res.json({success: true, contacts: contacts});
      }
   })
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

router.get("/search", (req, res) => {
    //access the parameter which is the id of the item to be deleted
    let nameString = req.query.q;

    // access the parameter which is the id of the item to be deleted
    contactBook.searchByName(nameString, (err, contacts) => {
        if(err) {
            res.json({success: false, message: `Failed to fetch contacts - Error: ${err}`})
        }
        else if (contacts) {
            res.json({success: true, contacts: contacts});
        }
        else {
            res.json({success: false});
        }
    });
});

module.exports = router;
