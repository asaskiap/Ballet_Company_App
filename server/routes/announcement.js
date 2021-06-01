/* eslint-disable prettier/prettier */
'use strict';

const { Router } = require('express');

const Announcement = require('./../models/announcement');
const fileUploadMiddleware = require('./../middleware/file-upload');

const router = new Router();

// list announcements
router.get('/load', async(req, res, next) => {
    try {
        const announcements = await Announcement.find({});
        announcements.sort((a, b) =>
            a.editDate > b.editDate ? -1 : b.editDate > a.editDate ? 1 : 0
        );

        res.json({ announcements });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//create announcement
router.post(
    '/',

    fileUploadMiddleware.single('image'),
    async(req, res, next) => {
        let image;
        if (req.file) {
            image = req.file.path;
        }
        const { title, message, importantFlag } = req.body;
        const creator = req.user;
        const creator_name = req.user.name;
        const creator_isAdmin = req.user.isAdministrator;
        const creator_picture = req.user.profilePicture;

        try {
            const announcement = await Announcement.create({
                title,
                message,
                importantFlag,
                image,
                creator,
                creator_name,
                creator_isAdmin,
                creator_picture
            });
            res.json({ announcement });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
);

// load single announcement
router.get('/:id', async(req, res, next) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        res.json({ announcement });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// delete announcement
router.delete('/:id', async(req, res, next) => {
    try {
        console.log('deleting announcement in router');
        await Announcement.findByIdAndDelete(req.params.id);
        res.json({});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// edit announcement
router.patch(
    '/:id',

    fileUploadMiddleware.single('image'),
    async(req, res, next) => {
        const { title, message, importantFlag } = req.body;
        const id = req.params.id;
        let image;
        if (req.file) {
            image = req.file.path;
        } else {
            image = req.body.image;
        }
        console.log('in router', image);
        try {
            const announcement = await Announcement.findByIdAndUpdate(
                id, {
                    $set: { title, message, importantFlag, image }
                }, { new: true }
            );
            res.json({ announcement });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;