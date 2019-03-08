const ObjectId = require('mongodb').ObjectID;

class ContactRepository {
    constructor(db) {
        this._collection = db.collection("contacts");
    }

    async create(contact) {
        const result = await this._collection.insertOne(contact);
        return !!result.result.ok;
    }

    async update(id, contact) {
        const result = await this._collection.updateOne({_id: new ObjectId(id)}, {$set: contact});
        return !!result.result.nModified;
    }

    async delete(id) {
        const result = await this._collection.deleteOne({_id: new ObjectId(id)});
        return !!result.result.n;
    }

    async getAllContacts(sortBy, sortMode, start, display, nameString = "") {
        let filter = {};
        if (nameString) {
            const regex = new RegExp(nameString, "i");
            filter = {"name": regex};
        }
        return await this._collection.find(filter).sort([[sortBy, sortMode]]).skip(start).limit(display);
    }
}

module.exports = ContactRepository;