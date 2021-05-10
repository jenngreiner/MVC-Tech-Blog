const router = require('express').Router();
const { Blog, Comment, User } = require('../models/');

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [User],
    });

    // Serialize data so template can read it
    const blogPosts = blogData.map((post) => post.get({ plain: true }));

    // pass serialized data and session flag into template
    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET blog post by id
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogPost = blogData.get({ plain: true });

    res.render('blog', {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
