const express = require("express");
const router = express.Router();
const config = require("../config/databse");
const mongo = require('mongodb');
const Contact = require("../models/Contact");
const ContactRepository = require("../repositories/ContactRepository");

let connection;
let db;
let repository;

(async () => {
    const MongoClient = mongo.MongoClient;
    connection = await MongoClient.connect(config.database, { useNewUrlParser: true });
    db = connection.db("contactBook");
    repository = new ContactRepository(db);

    router.get("/", async (req, res) => {
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

        const errors = validation(req.body);
        if(Object.entries(errors).length !== 0) {
            let message = {};
            Object.keys(errors).forEach(key => {
                message[key] = errors[key]
            });
            res.json({success: false, message})
        }
        else {
            await repository.create(newContact)
                ? res.json({success: true, message: "Created successfully"})
                : res.json({success: false, message: "Failed to create a new contact"});
        }
    });

    router.put("/:id", async (req, res) => {
        const id = req.params.id.substring(1);
        const updatedContact = new Contact(
            req.body.name,
            req.body.gender,
            req.body.email,
            req.body.phoneNumber
        );

        const errors = validation(req.body);
        if(Object.entries(errors).length !== 0) {
            let message = {};
            Object.keys(errors).forEach(key => {
                message[key] = errors[key]
            });
            res.json({success: false, message})
        }
        else {
            await repository.update(id, updatedContact)
                ? res.json({success: true, message: "Updated successfully"})
                : res.json({success: false, message: "Failed to update the contact"});
        }
    });

    router.delete("/:id", async (req, res) => {
        const id = req.params.id.substring(1);
    
        await repository.delete(id)
            ? res.json({success: true, message: "Deleted successfully"})
            : res.json({success: false, message: "Failed to delete the contact"});
    });
})();


function validation(body) {
    const required = ["name", "gender", "phoneNumber"];
    let errors = {};

    required.forEach( field => {
        if(!body[field]) {
            errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is mandatory`;
        }
    });

    const regexValidation = {
        name: {
            rule: new RegExp("^[a-zA-آ ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی ,.'-]{3,32}$", "i"),
            error: "Name is invalid: must be a text, and at least 3 and at most 32 characters length"
        },
        gender: {
            rule: new RegExp("female|male", "i"),
            error: "Gender is invalid: must be only male or female"
        },
        email: {
            rule: new RegExp("^$|^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", "i"),
            error: "Email is inavlid"
        },
        phoneNumber: {
            rule: new RegExp("^0[0-9]{2,3}[0-9]{8}$|^(09|9)[013]([0-9]{1})[0-9]{7}$"),
            error: "PhoneNmber is invalid"
        }
    };

    Object.keys(regexValidation).forEach(field => {
        if(!errors[field]) {
            if(!regexValidation[field].rule.test(body[field])) {
                errors[field] = regexValidation[field].error;
            }
        }
    });

    return errors;
}

module.exports = router;
