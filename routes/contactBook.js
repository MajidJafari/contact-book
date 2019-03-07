const express = require("express");
const router = express.Router();
const config = require("../config/databse");
const mongo = require('mongodb');
const Contact = require("../models/Contact");
const ContactRepository = require("../repositories/ContactRepository");

const CircularJSON = require("flatted");

let connection;
let db;
let repository;

(async () => {
    const MongoClient = mongo.MongoClient;
    connection = await MongoClient.connect(config.database, { useNewUrlParser: true });
    db = connection.db("contactBook");
    repository = new ContactRepository(db);

    router.get("/", async (req, res) => {
        console.log(req.sessionID);
        console.log(req.session.isLoggedIn);
        const nameString = req.query.search;
        const sortBy = req.query.sort || "name";
        const sortMode = req.query.mode || "asc";
        const start = Number(req.query.start) || 0;
        const display = Number(req.query.display) || 100;

        try {
            const contacts = await repository.getAllContacts(sortBy, sortMode, start, display, nameString);
            contacts.toArray().then(result => {
                res.json({success: true, contacts: result});
            }).catch(err => {
                res.json({success: false, message: `Failed to load all contacts - Error${err}`});
            });
        }
        catch (err) {
            res.json({success: false, message: `Failed to load all contacts - Error${err}`});
        }
    });

    router.post("/", async (req, res) => {
        const newContact = new Contact(
            req.body.name,
            req.body.gender,
            req.body.email,
            req.body.phoneNumber
        );

        await repository.create(newContact)
            ? res.json({success: true, message: "Created successfully"})
            : res.json({success: false, message: "Failed to create a new contact"});
        });

    router.put("/:id", async (req, res) => {
        const id = req.params.id.substring(1);
        const updatedContact = new Contact(
            req.body.name,
            req.body.gender,
            req.body.email,
            req.body.phoneNumber
        );

        await repository.update(id, updatedContact)
            ? res.json({success: true, message: "Updated successfully"})
            : res.json({success: false, message: "Failed to update the contact"});
    });

    router.delete("/:id", async (req, res) => {
        const id = req.params.id.substring(1);
    
        await repository.delete(id)
            ? res.json({success: true, message: "Deleted successfully"})
            : res.json({success: false, message: "Failed to delete the contact"});
    });
})();

module.exports = router;
