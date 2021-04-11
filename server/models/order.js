'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    // one or the other item should be required, not both... How?
    item: {
        type: String
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    size: {
        type: mongoose.Schema.Types.Mixed
    },
    width: {
        type: String
    },
    color: {
        type: String
    },
    maker: {
        type: String
    },
    comments: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    inProcess: {
        type: Boolean,
        default: false
    },
    shipped: {
        type: Boolean,
        default: false
    },
    received: {
        type: Boolean,
        default: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creator_name: {
        type: String
    }
}, {
    timestamps: {
        createdAt: 'addedDate',
        updatedAt: 'editDate'
    }
});

module.exports = mongoose.model('Order', schema);