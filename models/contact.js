const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Female", "Male"]
    },
    email: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        required: true,
    }
});

const contactBook = module.exports = mongoose.model("contacts", contactSchema);

// Get all contacts from DB
module.exports.getAllContacts = (start, display, callback) => {
    contactBook.find(callback).skip(start).limit(display);
};

// Insert the document into MongoDB
module.exports.addContact = (newContact, callback) => {
    newContact.save(callback);
};

// Here we need to pass an id parameter
module.exports.updateContactById = (id, updatedContact, callback) => {
    const contact = {
        name: updatedContact.name,
        gender: updatedContact.gender,
        email: updatedContact.email,
        phoneNumber: updatedContact.phoneNumber,
    };
    contactBook.findByIdAndUpdate(id, contact, {new: true}, callback);
};

module.exports.deleteContactById = (id, callback) => {
    contactBook.findByIdAndRemove(id, callback);
};

module.exports.searchByName = (nameString, start, display, callback) => {
    const regex = new RegExp(nameString, "i");
    contactBook.find({"name": regex}, callback).skip(start).limit(display);
};

module.exports.count = (query, callback) => {
    contactBook.count(query, callback);
};