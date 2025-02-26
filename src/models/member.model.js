'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Member';
const COLLECTION_NAME = 'Members';

// Declare the Schema of the Mongo model
const memberSchema = new mongoose.Schema({
    membername: { type: String, require: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, memberSchema);