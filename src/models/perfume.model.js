'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Perfume';
const COLLECTION_NAME = 'Perfumes';

// Declare the Schema of the Mongo model
const perfumechema = new mongoose.Schema({
    perfumeName: { type: String, require: true },
    uri: { type: String, require: true },
    price: { type: Number, require: true },
    concentration: { type: String, require: true }, // nồng độ của nước hoa: Extrait
    description: { type: String, require: true },
    ingredients: { type: String, require: true },
    volume: { type: Number, require: true },
    targetAudience: { type: String, require: true }, // male, femail, unisex
    comments: [commentSchema],
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brands", require: true },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, perfumechema);


const commentSchema = new mongoose.Schema({
    rating: { type: Number, min: 1, max: 3, require: true },
    content: { type: String, require: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Members", require: true }
}, {
    timestamps: true,
    collection: 'Comments'
}
);