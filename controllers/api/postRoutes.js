const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all blog post
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [['date_created', 'DESC']]
        });

        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Create a blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(postData);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Update a blog post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!postData) {
            res.status(404).json({ message: 'No post with this id' });
            return;
        }

        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!postData) {
            res.status(404).json({ message: 'No post with this id' });
            return;
        }

        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
