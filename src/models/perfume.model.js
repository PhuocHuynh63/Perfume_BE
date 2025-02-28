'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Perfume';
const COLLECTION_NAME = 'Perfumes';


const commentSchema = new mongoose.Schema({
    rating: { type: Number,min: 1,max: 3,require: true },
    content: { type: String,require: true },
    author: { type: mongoose.Schema.Types.ObjectId,ref: "Members",require: true }
},{
    timestamps: true,
    collection: 'Comments'
}
);

const perfumeSchema = new mongoose.Schema({
    perfumeName: { type: String, required: true },
    uri: { type: String, required: true },
    price: { type: Number, required: true },
    concentration: { type: String, required: true }, // nồng độ của nước hoa: Extrait
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    volume: { type: Number, required: true },
    targetAudience: { type: String, required: true }, // male, femail, unisex
    comments: [commentSchema],
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
},{
    timestamps: true,
    collection: COLLECTION_NAME
}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME,perfumeSchema);

