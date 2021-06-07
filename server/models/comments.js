/* eslint-disable prettier/prettier */
'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    // one or the other item should be required, not both... How?
    comment: {
        type: String,
        trim: true,
        required: true
    },
    creatorName: {
        type: String
    },
    creatorId: {
        type: String
    },
    announcement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Announcement'
    }
}, {
    timestamps: {
        createdAt: 'addedDate',
        updatedAt: 'editDate'
    }
});

module.exports = mongoose.model('Comment', schema);