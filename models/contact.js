const mongoose = require("mongoose");

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
module.exports.getAllContacts = (callback) => {
    contactBook.find(callback);
};

// Insert the document into MongoDB
module.exports.addContact = (newContact, callback) => {
    newContact.save(callback);
};

// Here we need to pass an id parameter
module.exports.updateContactById = (id, updatedContact, callback) => {
    const query = {_id: id};
    contactBook.findeOneAndUpdate(query, updatedContact, {upsert: true}, callback);
};

module.exports.deleteContactById = (id, callback) => {
    const query = {_id: id};
    contactBook.find(query).remove(callback);
};