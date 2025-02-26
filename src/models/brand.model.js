'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Brand';
const COLLECTION_NAME = 'Brands';

// Declare the Schema of the Mongo model
const brandSchema = new mongoose.Schema({
    brandName: String
}, {
    timestamps: true,
    collection: COLLECTION_NAME
}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, brandSchema);