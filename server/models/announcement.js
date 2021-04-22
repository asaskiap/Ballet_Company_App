/* eslint-disable prettier/prettier */
'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    // one or the other item should be required, not both... How?
    title: {
        type: String,
        trim: true,
        required: true
    },
    message: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    importantFlag: {
        type: Boolean,
        default: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creator_name: {
        type: String
    },
    creator_isAdmin: {
        type: Boolean,
        default: false
    },
    creator_picture: {
        type: String
    }
}, {
    timestamps: {
        createdAt: 'addedDate',
        updatedAt: 'editDate'
    }
});

module.exports = mongoose.model('Announcement', schema);