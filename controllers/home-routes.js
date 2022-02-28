const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models/index');

router.get('/', (req, res) => {
    console.log(req.session)

    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            // pass a single post object into the homepage template
            // render the homepage.handlebars template (the .handlebars is implied) Handlebars will auto feed the content in homepage.handlebars into main.handlebars template and res with complete HTML file
            // the res.render() method can accept a second argument, an object, which includes all the data you want to pass to your template
            // console.log(dbPostData[0].get({ plain: true }));
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('login'); // login.handlebars 
});

module.exports = router;