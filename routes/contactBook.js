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
    console.log(req);
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

router.delete("/:id", (req, res) => {
   //access the parameter which is the id of the item to be deleted
      let id = req.param.id;
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
