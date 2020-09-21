const router = require('express').Router();

router.get('', (req, res) => {
	res.render('home');
});

// login route
router.get('/login', (req, res) => {
	res.render('login');
});

// register route
router.get('/register', (req, res) => {
	res.render('register');
});

// export the routes
module.exports = router;
