/* eslint-disable prettier/prettier */
'use strict';

const { Router } = require('express');

const Announcement = require('./../models/announcement');
const Comment = require('../models/comments');
const router = new Router();

// list comments for one specific announcement

router.get('/load/:id', async(req, res, next) => {
    const id = req.params.id;

    try {
        const announcement = await Announcement.findById(id);
        const comments = await Comment.find({
            announcement: announcement
        }).populate('creator');
        console.log(comments)
        comments.sort((a, b) =>
            a.editDate > b.editDate ? -1 : b.editDate > a.editDate ? 1 : 0
        );

        console.log(comments);
        res.json({ comments: comments });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//create comment
router.post('/', async (req, res, next) => {
    const { content, creatorName, creatorId, ref } = req.body;
  
    const announcement = await Announcement.findById(ref);

    try {
        const comment = await Comment.create({
            comment: content,
            creatorName,
            creatorId,
            announcement
        });
        res.json({ comment: comment });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// delete comment
router.delete('/:id', async(req, res, next) => {
    try {
        console.log('deleting comment in router');
        await Comment.findByIdAndDelete(req.params.id);
        res.json({});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// edit comment
router.patch('/:id', async(req, res, next) => {
    console.log(req.body);
    const { content } = req.body;
    const id = req.params.id;

    try {
        const comment = await Comment.findByIdAndUpdate(
            id, {
                $set: { comment: content }
            }, { new: true }
        );
        res.json({ comment });
    } catch (error) {
        next(error);
    }
});

module.exports = router;