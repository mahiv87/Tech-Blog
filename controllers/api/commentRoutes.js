const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get post comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Create a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment: req.body.comment,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });

        res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }

        res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
