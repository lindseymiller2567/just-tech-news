const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage'); //render the homepage.handlebars template (the .handlebars is implied) Handlebars will auto feed the content in homepage into main.handlebars template and res with complete HTML file
});

module.exports = router;