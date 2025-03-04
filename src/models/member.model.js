'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Member';
const COLLECTION_NAME = 'Members';

// Declare the Schema of the Mongo model
const memberSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true, email: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    YOB: {
        type: Number,
        require: true,
        validate: {
            validator: function (v) {
                return v.toString().length === 4;
            },
            message: props => `${props.value} is not a valid year of birth!`
        }
    },
    gender: { type: String, require: true, enum: ['Male', 'Female'] },
    isAdmin: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, memberSchema);