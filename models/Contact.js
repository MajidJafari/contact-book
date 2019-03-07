class Contact {
    constructor(name, gender, email = "", phoneNumber) {
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}

module.exports = Contact;