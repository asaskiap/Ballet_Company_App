/* eslint-disable prettier/prettier */
'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    profilePicture: {
        type: String
    },

    isAdministrator: {
        type: Boolean,
        default: false
    },
    pt_brand: {
        type: String,
        default: 'not specified'
    },
    pt_maker: {
        type: String,
        default: 'not specified'
    },
    pt_model: {
        type: String,
        default: 'not specified'
    },
    pt_size: {
        type: Number,
        default: 0
    },
    pt_width: {
        type: String,
        default: 'not specified'
    },
    ss_brand: {
        type: String,
        default: 'not specified'
    },
    pt_color: {
        type: String,
        default: 'not specified'
    },
    ss_size: {
        type: Number,
        default: 0
    },
    ss_width: {
        type: String,
        default: 'not specified'
    },
    ss_color: {
        type: String,
        default: 'not specified'
    },
    dress_size: {
        type: String,
        default: 'not specified'
    },
    sock_size: {
        type: String,
        default: 'not specified'
    },
    shoe_size: {
        type: Number,
        default: 0
    },
    orders: [],

    profilePicture: {
        type: String
    },
    passwordHashAndSalt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', schema);